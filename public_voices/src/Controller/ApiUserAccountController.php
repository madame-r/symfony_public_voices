<?php

namespace App\Controller;

use App\Service\ApiUserAccountService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class ApiUserAccountController extends AbstractController
{
    public function __construct(
        private readonly ApiUserAccountService $accountService
    ) {}

    #[Route('/api/favorites', name: 'api_favorites', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function toggleFavorite(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        try {
            $result = $this->accountService->toggleFavorite($user, $data);
            return new JsonResponse($result, 200);
        } catch (\InvalidArgumentException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/api/favorites', name: 'api_favorites_list', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getFavorites(): JsonResponse
    {
        $user = $this->getUser();
        $favorites = $this->accountService->getFavorites($user);
        return new JsonResponse($favorites, 200);
    }

    #[Route('/api/bookmarks', name: 'api_bookmarks', methods: ['GET', 'POST'])]
    public function bookmarks(Request $request): JsonResponse
    {
        return new JsonResponse(['message' => 'Endpoint /api/bookmarks ready'], 200);
    }
}
