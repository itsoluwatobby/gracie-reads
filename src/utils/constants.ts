export const ModalTags = ['about', 'categories', 'latest'];

export const hoverEffects = [
  'hover:-translate-x-1 hover:-translate-y-0.5',
  'hover:translate-x-1 hover:-translate-y-0.5',
  'hover:-translate-x-1 hover:translate-y-0.5',
  'hover:translate-x-1 hover:translate-y-0.5'
];

export const AudioSpeeds = {
  '0.75x': 0.75,
  Normal: 1,
  '1.25x': 1.25,
  '1.5x': 1.5,
  '1.75x': 1.75,
  '2x': 2,
};

export const RecentDuration = 5 * 24 * 60 * 60 * 1000; // 5 days ago

export const chapters = [
  { id: '1', name: 'episode_1', link: 'https://drive.google.com/file/d/1GaChOgsRvXqwGEUYSJZd-UJMphf4SSxB/view?usp=drivesdk', duration: '600kb' },
  { id: '2', name: 'episode_2', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '3', name: 'episode_3', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '4', name: 'episode_4', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '5', name: 'episode_5', link: 'https://drive.google.com/file/d/1GaChOgsRvXqwGEUYSJZd-UJMphf4SSxB/view?usp=drivesdk', duration: '600kb' },
  { id: '6', name: 'episode_6', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '7', name: 'episode_7', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '8', name: 'episode_8', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '9', name: 'episode_9', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '10', name: 'episode_10', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '11', name: 'episode_11', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '12', name: 'episode_12', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '13', name: 'episode_13', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
  { id: '14', name: 'episode_14', link: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav', duration: '600kb' },
];

export const HTTPMethods = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};

export const CacheKeys = {
  playbackRate: 'audio-playback-rate',
  session: 'lovely-audios-session',
}
