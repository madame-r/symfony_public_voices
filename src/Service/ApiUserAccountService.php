<?php

namespace App\Service;

use App\Entity\Books;
use App\Entity\Authors;
use App\Entity\Languages;
use App\Entity\Favorites;
use App\Repository\BooksRepository;
use App\Repository\FavoritesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ApiUserAccountService
{
    public function __construct(
        private EntityManagerInterface $em,
        private BooksRepository $booksRepository,
        private FavoritesRepository $favoritesRepository
    ) {}

    public function toggleFavorite(UserInterface $user, array $data): array
    {
        if (
            !$data
            || !isset($data['id'], $data['title'], $data['authors'], $data['language'])
            || !is_array($data['authors'])
        ) {
            throw new \InvalidArgumentException('Invalid or incomplete data');
        }

        $librivoxId = $data['id'];

        $book = $this->booksRepository->findOneBy(['librivox_book_id' => $librivoxId]);

        if (!$book) {
            $book = new Books();
            $book->setLibrivoxBookId($librivoxId);
            $book->setTitle($data['title']);
            $book->setDescription($data['description'] ?? '');
            $book->setTotalTimeSeconds($data['totalTime'] ?? 0);
            $book->setUrlZipFile($data['zipUrl'] ?? null);
            $book->setCoverImageUrl($data['cover'] ?? null);
            $book->setCoverThumbnailUrl($data['coverThumbnail'] ?? null);
            $book->setCreatedAt(new \DateTimeImmutable());

            $language = $this->em->getRepository(Languages::class)->findOneBy(['name' => $data['language']]);
            if (!$language) {
                $language = new Languages();
                $language->setName($data['language']);
                $this->em->persist($language);
            }
            $book->setLanguages($language);

            foreach ($data['authors'] as $authorData) {
                $author = $this->em->getRepository(Authors::class)->findOneBy([
                    'first_name' => $authorData['first_name'] ?? '',
                    'last_name' => $authorData['last_name'] ?? '',
                ]);

                if (!$author) {
                    $author = new Authors();
                    $author->setFirstName($authorData['first_name'] ?? '');
                    $author->setLastName($authorData['last_name'] ?? '');
                    $author->setDob($authorData['dob'] ?? null);
                    $author->setDod($authorData['dod'] ?? null);
                    $this->em->persist($author);
                }

                $book->addAuthor($author);
            }

            $this->em->persist($book);
        }

        $existingFavorite = $this->favoritesRepository->findOneBy([
            'user' => $user,
            'books' => $book,
        ]);

        if ($existingFavorite) {
            $this->em->remove($existingFavorite);
            $this->em->flush();
            return ['message' => 'Removed from favorites'];
        }

        $favorite = new Favorites();
        $favorite->setUser($user);
        $favorite->setBooks($book);
        $favorite->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($favorite);
        $this->em->flush();

        return ['message' => 'Added to favorites'];
    }

    public function getFavorites(UserInterface $user): array
    {
        $favorites = $this->favoritesRepository->findBy(['user' => $user]);

        $data = [];

        foreach ($favorites as $favorite) {
            $book = $favorite->getBooks();

            $authorsData = [];
            foreach ($book->getAuthors() as $author) {
                $authorsData[] = [
                    'first_name' => $author->getFirstName(),
                    'last_name' => $author->getLastName(),
                ];
            }

            $data[] = [
                'id' => $book->getId(),
                'librivox_book_id' => $book->getLibrivoxBookId(),
                'title' => $book->getTitle(),
                'description' => $book->getDescription(),
                'cover_image_url' => $book->getCoverImageUrl(),
                'cover_thumbnail_url' => $book->getCoverThumbnailUrl(),
                'total_time_seconds' => $book->getTotalTimeSeconds(),
                'authors' => $authorsData,
            ];
        }

        return $data;
    }
}
