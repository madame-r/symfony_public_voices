<?php

namespace App\Controller;

use App\Service\ApiLibrivoxService;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Routing\Attribute\Route;




final class ApiLibrivoxController extends AbstractController
{

    private ApiLibrivoxService $apiLibrivoxService;


    public function __construct(ApiLibrivoxService $apiLibrivoxService)
    {
        $this->apiLibrivoxService = $apiLibrivoxService;
    }



    #[Route('api/librivox/books', name: 'get_books', methods: ['GET'])]
    public function getBooks(Request $request): JsonResponse
    {
        // Récupérer les paramètres depuis la requête GET
        $limit = (int) $request->query->get('limit', 6);
        $offset = (int) $request->query->get('offset', 0);

        // Récupérer le terme de recherche (peut être un titre ou un auteur)
        $search = $request->query->get('search');

        $data = $this->apiLibrivoxService->fetchBooks($limit, $offset, $search);
        return $this->json($data);
    }


    #[Route('api/librivox/{audiobookId}/coverarts', name: 'get_coverart', methods: ['GET'])]
    public function getCoverArts(int $audiobookId): JsonResponse
    {
        $coverarts = $this->apiLibrivoxService->fetchCoverArts($audiobookId);
        return $this->json($coverarts);
    }



    #[Route('api/librivox/{audiobookId}/genres', name: 'get_genres', methods: ['GET'])]
    public function getGenres(int $audiobookId): JsonResponse
    {
        $genres = $this->apiLibrivoxService->fetchGenres($audiobookId);
        return $this->json($genres);
    }



    #[Route('api/librivox/{audiobookId}/audiotracks', name: 'get_audiotracks', methods: ['GET'])]
    public function getAudioTracks(int $audiobookId): JsonResponse
    {
        $audiotracks = $this->apiLibrivoxService->fetchAudioTracks($audiobookId);
        return $this->json($audiotracks);
    }


    #[Route('api/librivox/books/{id}', name: 'get_book_by_id', methods: ['GET'])]
    public function getBookById(int $id): JsonResponse
    {
        $book = $this->apiLibrivoxService->fetchBookById($id);

        if (!$book) {
            return $this->json(['error' => 'Livre non trouvé'], 404);
        }

        return $this->json($book);
    }
}
