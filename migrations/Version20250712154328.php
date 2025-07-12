<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250712154328 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE books_genres (books_id INT NOT NULL, genres_id INT NOT NULL, INDEX IDX_6C215D1A7DD8AC20 (books_id), INDEX IDX_6C215D1A6A3B2603 (genres_id), PRIMARY KEY(books_id, genres_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE books_genres ADD CONSTRAINT FK_6C215D1A7DD8AC20 FOREIGN KEY (books_id) REFERENCES books (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE books_genres ADD CONSTRAINT FK_6C215D1A6A3B2603 FOREIGN KEY (genres_id) REFERENCES genres (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE books ADD languages_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE books ADD CONSTRAINT FK_4A1B2A925D237A9A FOREIGN KEY (languages_id) REFERENCES languages (id)');
        $this->addSql('CREATE INDEX IDX_4A1B2A925D237A9A ON books (languages_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE books_genres DROP FOREIGN KEY FK_6C215D1A7DD8AC20');
        $this->addSql('ALTER TABLE books_genres DROP FOREIGN KEY FK_6C215D1A6A3B2603');
        $this->addSql('DROP TABLE books_genres');
        $this->addSql('ALTER TABLE books DROP FOREIGN KEY FK_4A1B2A925D237A9A');
        $this->addSql('DROP INDEX IDX_4A1B2A925D237A9A ON books');
        $this->addSql('ALTER TABLE books DROP languages_id');
    }
}
