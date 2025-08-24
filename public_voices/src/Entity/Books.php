<?php

namespace App\Entity;

use App\Repository\BooksRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BooksRepository::class)]
class Books
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $librivox_book_id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $total_time_seconds = null;

    #[ORM\Column(length: 255)]
    private ?string $url_zip_file = null;

    #[ORM\Column(length: 255)]
    private ?string $cover_image_url = null;

    #[ORM\Column(length: 255)]
    private ?string $cover_thumbnail_url = null;

    /**
     * @var Collection<int, Favorites>
     */
    #[ORM\OneToMany(targetEntity: Favorites::class, mappedBy: 'books')]
    private Collection $favorites;

    /**
     * @var Collection<int, Bookmarks>
     */
    #[ORM\OneToMany(targetEntity: Bookmarks::class, mappedBy: 'books')]
    private Collection $bookmarks;

    /**
     * @var Collection<int, Authors>
     */
    #[ORM\ManyToMany(targetEntity: Authors::class, inversedBy: 'books')]
    private Collection $authors;

    /**
     * @var Collection<int, Genres>
     */
    #[ORM\ManyToMany(targetEntity: Genres::class, inversedBy: 'books')]
    private Collection $genres;

    #[ORM\ManyToOne(inversedBy: 'books')]
    private ?Languages $languages = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    public function __construct()
    {
        $this->favorites = new ArrayCollection();
        $this->bookmarks = new ArrayCollection();
        $this->authors = new ArrayCollection();
        $this->genres = new ArrayCollection();
        $this->created_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibrivoxBookId(): ?int
    {
        return $this->librivox_book_id;
    }

    public function setLibrivoxBookId(int $librivox_book_id): static
    {
        $this->librivox_book_id = $librivox_book_id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTotalTimeSeconds(): ?int
    {
        return $this->total_time_seconds;
    }

    public function setTotalTimeSeconds(int $total_time_seconds): static
    {
        $this->total_time_seconds = $total_time_seconds;

        return $this;
    }

    public function getUrlZipFile(): ?string
    {
        return $this->url_zip_file;
    }

    public function setUrlZipFile(string $url_zip_file): static
    {
        $this->url_zip_file = $url_zip_file;

        return $this;
    }

    public function getCoverImageUrl(): ?string
    {
        return $this->cover_image_url;
    }

    public function setCoverImageUrl(string $cover_image_url): static
    {
        $this->cover_image_url = $cover_image_url;

        return $this;
    }

    public function getCoverThumbnailUrl(): ?string
    {
        return $this->cover_thumbnail_url;
    }

    public function setCoverThumbnailUrl(string $cover_thumbnail_url): static
    {
        $this->cover_thumbnail_url = $cover_thumbnail_url;

        return $this;
    }

    /**
     * @return Collection<int, Favorites>
     */
    public function getFavorites(): Collection
    {
        return $this->favorites;
    }

    public function addFavorite(Favorites $favorite): static
    {
        if (!$this->favorites->contains($favorite)) {
            $this->favorites->add($favorite);
            $favorite->setBooks($this);
        }

        return $this;
    }

    public function removeFavorite(Favorites $favorite): static
    {
        if ($this->favorites->removeElement($favorite)) {
            // set the owning side to null (unless already changed)
            if ($favorite->getBooks() === $this) {
                $favorite->setBooks(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Bookmarks>
     */
    public function getBookmarks(): Collection
    {
        return $this->bookmarks;
    }

    public function addBookmark(Bookmarks $bookmark): static
    {
        if (!$this->bookmarks->contains($bookmark)) {
            $this->bookmarks->add($bookmark);
            $bookmark->setBooks($this);
        }

        return $this;
    }

    public function removeBookmark(Bookmarks $bookmark): static
    {
        if ($this->bookmarks->removeElement($bookmark)) {
            // set the owning side to null (unless already changed)
            if ($bookmark->getBooks() === $this) {
                $bookmark->setBooks(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Authors>
     */
    public function getAuthors(): Collection
    {
        return $this->authors;
    }

    public function addAuthor(Authors $author): static
    {
        if (!$this->authors->contains($author)) {
            $this->authors->add($author);
        }

        return $this;
    }

    public function removeAuthor(Authors $author): static
    {
        $this->authors->removeElement($author);

        return $this;
    }

    /**
     * @return Collection<int, Genres>
     */
    public function getGenres(): Collection
    {
        return $this->genres;
    }

    public function addGenre(Genres $genre): static
    {
        if (!$this->genres->contains($genre)) {
            $this->genres->add($genre);
        }

        return $this;
    }

    public function removeGenre(Genres $genre): static
    {
        $this->genres->removeElement($genre);

        return $this;
    }

    public function getLanguages(): ?Languages
    {
        return $this->languages;
    }

    public function setLanguages(?Languages $languages): static
    {
        $this->languages = $languages;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }
}
