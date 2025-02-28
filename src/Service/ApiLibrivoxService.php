<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


class ApiLibrivoxService
{

    private HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }




    public function fetchBooks(): array
    {
        try {

            $response = $this->httpClient->request('GET', 'https://librivox.org/api/feed/audiobooks');

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Erreur lors de la récupération des données depuis l\'API Librivox.');
            }


            $xmlContent = $response->getContent();
            $xml = simplexml_load_string($xmlContent);
            $json = json_encode($xml);
            $data = json_decode($json, true);

            // dd($data);

            return $data;



        } catch (\Exception $e) {

            return ['error' => $e->getMessage()];
        }
    }


    public function fetchCoverArts(int $audiobookId): array
    {

        try {

            $url = "https://librivox.org/api/feed/audiobooks/?id={$audiobookId}&format=json&coverart=1";

            $response = $this->httpClient->request('GET', $url);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Erreur lors de la récupération des données Cover Arts depuis Librivox.');
            }


            $data = json_decode($response->getContent(), true);

            // dd($data);

            return $data;
            

        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }


    public function fetchGenres(int $audiobookId): array
    {

        try {

            $url = "https://librivox.org/api/feed/audiobooks/?id={$audiobookId}&extended=1&format=json";

            $response = $this->httpClient->request('GET', $url);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Erreur lors de la récupération des données Genres depuis Librivox.');
            }

            $data = json_decode($response->getContent(), true);

            if (!isset($data['books'][0])) {
                throw new \Exception('Aucun livre trouvé pour cet ID.');
            }

            $book = $data['books'][0];

            $genres = [];

            if (isset($book['genres']) && is_array($book['genres'])) {
                foreach ($book['genres'] as $genre) {
                    $genres[] = [
                        'id' => $genre['id'] ?? null,
                        'name' => $genre['name'] ?? null,
                    ];
                }
            }

            return $genres;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }


    public function fetchAudioTracks(int $audiobookId): array
    {

        try {

            $url = "https://librivox.org/api/feed/audiotracks?project_id={$audiobookId}";

            $response = $this->httpClient->request('GET', $url);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Erreur lors de la récupération des données audiotracks depuis l\'API Librivox.');
            }


            $xmlContent = $response->getContent();
            $xml = simplexml_load_string($xmlContent);

            $audioTracks = [];

            foreach ($xml->sections->section as $section) {

                $audioTracks[] = [
                    'id' => (int) $section->id,
                    'title' => (string) $section->title,
                    'chapter_order' => (int) $section->section_number,
                    'url_mp3' => (string) $section->listen_url,
                    'language' => (string) $section->language,
                    'playtime' => (int) $section->playtime, // Durée en secondes
                ];
            }

            return $audioTracks;
        } catch (\Exception $e) {

            return ['error' => $e->getMessage()];
        }
    }


    
}
