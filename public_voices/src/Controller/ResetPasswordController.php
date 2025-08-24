<?php

namespace App\Controller;

use App\Form\ResetPasswordRequestType;
use App\Form\ResetPasswordType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;



final class ResetPasswordController extends AbstractController
{
    #[Route('/reset/password', name: 'app_forgot_password_request')]
    public function request(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $em,
        MailerInterface $mailer
    ): Response {

        $form = $this->createForm(ResetPasswordRequestType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userEmail = $form->get('email')->getData();
            $user = $userRepository->findOneBy(['email' => $userEmail]);

            if ($user) {
                try {
                    $token = bin2hex(random_bytes(32));
                } catch (\Exception $e) {
                    $this->addFlash('danger', 'Une erreur est survenue. Veuillez réessayer.');
                    return $this->redirectToRoute('app_forgot_password_request');
                }

                $user->setResetToken($token);
                $user->setResetTokenExpiredAt(new \DateTimeImmutable('+1 hour'));

                $em->flush();

                $resetUrl = $this->generateUrl('app_reset_password_token', [
                    'token' => $token,
                ], UrlGeneratorInterface::ABSOLUTE_URL);

                $emailMessage = (new TemplatedEmail())
                    ->from('noreply@audiobook.local')
                    ->to($userEmail)
                    ->subject('Réinitialisation de votre mot de passe')
                    ->htmlTemplate('reset_password/email.html.twig')
                    ->context([
                        'resetUrl' => $resetUrl,
                        'username' => $user->getUsername(),
                    ]);

                $mailer->send($emailMessage);
            }

            if ($user) {
                $this->addFlash('success', 'A reset link has been sent to you.');
            } else {
                $this->addFlash('danger', 'This account doesn\'t exist');
            }


            return $this->redirectToRoute('app_forgot_password_request');
        }


        return $this->render('reset_password/index.html.twig', [
            'requestForm' => $form->createView(),
        ]);
    }





    #[Route('/reset/password/{token}', name: 'app_reset_password_token')]
    public function reset(
        string $token,
        UserRepository $userRepository,
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): Response {

        $user = $userRepository->findOneBy(['reset_token' => $token]);

        if (!$user || $user->getResetTokenExpiredAt() < new \DateTimeImmutable()) {

            $this->addFlash('danger', 'The reset link is invalid or expired.');

            return $this->redirectToRoute('app_forgot_password_request');
        }

        $form = $this->createForm(ResetPasswordType::class);
        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();

            if ($data['newPassword'] !== $data['confirmPassword']) {
                $this->addFlash('danger', 'The passwords do not match.');
                return $this->redirectToRoute('app_reset_password_token', ['token' => $token]);
            } else {

                $hashedPassword = $passwordHasher->hashPassword($user, $data['newPassword']);

                $user->setPassword($hashedPassword);
                $user->setResetToken(null);
                $user->setResetTokenExpiredAt(null);

                $em->flush();

                $em->refresh($user);

                $this->addFlash('success', 'Your password has been reset successfully.');

            }
        }

        return $this->render('reset_password/reset.html.twig', [
            'resetForm' => $form->createView(),
        ]);
    }
}
