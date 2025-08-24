<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PlayerController extends AbstractController
{
    #[Route('/player/{bookId}', name: 'app_player', methods: ['GET'])]
    public function index(int $bookId): Response
    {

        
        return $this->render('player/index.html.twig', [
            'bookId' => $bookId,
        ]);
    }
}
