<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;



final class UserAccountController extends AbstractController
{
    #[Route('/user-account', name: 'app_user_account')]
    #[IsGranted('ROLE_USER')]
    public function index(): Response
    {
        return $this->render('user_account/index.html.twig', [
            'controller_name' => 'UserAccountController',
        ]);
    }
}
