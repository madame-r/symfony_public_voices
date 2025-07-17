<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;



final class ApiJWTController extends AbstractController
{



    #[Route('/api/favorites', name: 'api_favorites', methods: ['GET', 'POST'])]
    public function favorites(Request $request): JsonResponse
    {
        // TODO : ajouter logique métier pour récupérer ou ajouter un favori
        return new JsonResponse(['message' => 'Endpoint /api/favorites ready'], 200);
    }


    #[Route('/api/bookmarks', name: 'api_bookmarks', methods: ['GET', 'POST'])]
    public function bookmarks(Request $request): JsonResponse
    {
        // TODO : ajouter logique métier pour récupérer ou ajouter un bookmark
        return new JsonResponse(['message' => 'Endpoint /api/bookmarks ready'], 200);
    }



}
