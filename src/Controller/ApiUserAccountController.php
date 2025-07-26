<?php

namespace App\Controller;

use App\Entity\Books;
use App\Entity\Authors;
use App\Entity\Languages;
use App\Entity\Favorites;
use App\Repository\BooksRepository;
use App\Repository\FavoritesRepository;

use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


final class ApiUserAccountController extends AbstractController
{

    #[Route('/api/favorites', name: 'api_favorites', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function favorites(
        Request $request,
        BooksRepository $booksRepository,
        FavoritesRepository $favoritesRepository,
        EntityManagerInterface $em
    ): JsonResponse {

        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (
            !$data
            || !isset($data['id'], $data['title'], $data['authors'], $data['language'])
            || !is_array($data['authors'])
        ) {
            return new JsonResponse(['error' => 'Invalid or incomplete data'], 400);
        }

        $librivoxId = $data['id'];

        // 1. Rechercher un livre existant
        $book = $booksRepository->findOneBy(['librivox_book_id' => $librivoxId]);

        // 2. Si inexistant, on le crée avec ses dépendances
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

            // 3. Langue (ManyToOne)
            $languageName = $data['language'];
            $language = $em->getRepository(Languages::class)->findOneBy(['name' => $languageName]);

            if (!$language) {
                $language = new Languages();
                $language->setName($languageName);
                $em->persist($language);
            }

            $book->setLanguages($language);

            // 4. Auteurs (ManyToMany)
            foreach ($data['authors'] as $authorData) {
                $firstName = $authorData['first_name'] ?? '';
                $lastName = $authorData['last_name'] ?? '';
                $dob = $authorData['dob'] ?? null;
                $dod = $authorData['dod'] ?? null;

                $author = $em->getRepository(Authors::class)->findOneBy([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                ]);

                if (!$author) {
                    $author = new Authors();
                    $author->setFirstName($firstName);
                    $author->setLastName($lastName);
                    $author->setDob($dob);
                    $author->setDod($dod);
                    $em->persist($author);
                }

                $book->addAuthor($author); // Généré par la relation ManyToMany
            }

            $em->persist($book);
        }

        // 5. Toggle Favori
        $existingFavorite = $favoritesRepository->findOneBy([
            'user' => $user,
            'books' => $book,
        ]);

        if ($existingFavorite) {
            $em->remove($existingFavorite);
            $em->flush();
            return new JsonResponse(['message' => 'Removed from favorites']);
        }

        $favorite = new Favorites();
        $favorite->setUser($user);
        $favorite->setBooks($book);
        $favorite->setCreatedAt(new \DateTimeImmutable());

        $em->persist($favorite);
        $em->flush();

        return new JsonResponse(['message' => 'Added to favorites']);
    }





    #[Route('/api/favorites', name: 'api_favorites_list', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getFavorites(FavoritesRepository $favoritesRepository): JsonResponse
    {
        $user = $this->getUser();
        $favorites = $favoritesRepository->findBy(['user' => $user]);

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

        return new JsonResponse($data, 200);
    }



    #[Route('/api/bookmarks', name: 'api_bookmarks', methods: ['GET', 'POST'])]
    public function bookmarks(Request $request): JsonResponse
    {
        // TODO : ajouter logique métier pour récupérer ou ajouter un bookmark
        return new JsonResponse(['message' => 'Endpoint /api/bookmarks ready'], 200);
    }
}
