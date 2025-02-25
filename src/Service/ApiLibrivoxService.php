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
    
            
            return $data;


        } catch (\Exception $e) {
            
            return ['error' => $e->getMessage()];
        }
    }


    public function fetchAudioTracks(int $projectId): array
    {

        try {
            
            $url = "https://librivox.org/api/feed/audiotracks?project_id={$projectId}";

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



    public function fetchRssFeed(int $projectId):array
    {

        try {
            
            $url = "https://librivox.org/rss/{$projectId}";

            $response = $this->httpClient->request('GET', $url);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Erreur lors de la récupération des données RSS depuis Librivox.');
            }


            $xmlContent = $response->getContent();
            $xml = simplexml_load_string($xmlContent, "SimpleXMLElement", LIBXML_NOCDATA);
 
            $title = (string) $xml->channel->title;
            $link = (string) $xml->channel->link;
            $description = (string) $xml->channel->description;

            $itunesImage = (string) $xml->channel->children('itunes', true)->image->attributes()->href;

            return [
                'title' => $title,
                'link' => $link,
                'description' => $description,
                'image' => $itunesImage
            ];



        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }


    }
    
    
}
