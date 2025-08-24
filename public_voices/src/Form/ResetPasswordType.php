<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;



class ResetPasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('newPassword', PasswordType::class, [
                'label' => false,
                'attr' => ['autocomplete' => 'new-password', 'placeholder' => 'New password'],
                'required' => true,
            ])
            ->add('confirmPassword', PasswordType::class, [
                'label' => false,
                'attr' => ['autocomplete' => 'new-password', 'placeholder' => 'Confirm password'],
                'required' => true,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => null,
        ]);
    }
}
