// Aetheris Tracks - All music by Rohit Maddali
export const tracks = [
    // Aetheris Exclusive - Cosmic Frequencies Series
    {
        id: '1',
        title: 'I',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 223,
        coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/I.wav',
        tags: ['Sleep', 'Deep Space', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    },
    {
        id: '2',
        title: 'II',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 139,
        coverImage: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/II.wav',
        tags: ['Focus', 'Alpha Waves', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    },
    {
        id: '3',
        title: 'III',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 282,
        coverImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/III.wav',
        tags: ['Meditation', 'Aetheris Exclusive'],
        isFree: false,
        isAetherisExclusive: true
    },
    {
        id: '4',
        title: 'IV',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 159,
        coverImage: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/IV.wav',
        tags: ['Relaxation', 'Cosmos', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    },
    {
        id: '5',
        title: 'V',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 261,
        coverImage: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/V.wav',
        tags: ['Sleep', 'Delta Waves', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    },
    {
        id: '6',
        title: 'VI',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 321,
        coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/VI.wav',
        tags: ['Focus', 'Space', 'Aetheris Exclusive'],
        isFree: false,
        isAetherisExclusive: true
    },
    {
        id: '7',
        title: 'VII',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 318,
        coverImage: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/VII.wav',
        tags: ['Calm', 'Ambient', 'Aetheris Exclusive'],
        isFree: false,
        isAetherisExclusive: true
    },
    {
        id: '8',
        title: 'VIII',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 386,
        coverImage: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/VIII.wav',
        tags: ['Deep', 'Theta Waves', 'Aetheris Exclusive'],
        isFree: false,
        isAetherisExclusive: true
    },
    {
        id: '9',
        title: 'IX',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 197,
        coverImage: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/IX.wav',
        tags: ['Relaxation', 'Flow', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    },
    {
        id: '10',
        title: 'X',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 134,
        coverImage: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/X.wav',
        tags: ['Meditation', 'Cosmic', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    },
    {
        id: '11',
        title: 'XI',
        artist: 'Rohit Maddali',
        album: 'Cosmic Frequencies',
        duration: 139,
        coverImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&auto=format&fit=crop&q=80',
        audioUrl: '/Frequency Magic/XI.wav',
        tags: ['Sleep', 'Drift', 'Aetheris Exclusive'],
        isFree: true,
        isAetherisExclusive: true
    }
];

export const sessions = [
    {
        id: 's1',
        title: 'Deep Sleep Journey',
        description: 'A continuous drift into the void with ambient frequencies.',
        length: '60 min',
        tracks: ['1', '5', '11', '4', '8'],
        coverImage: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&auto=format&fit=crop&q=80',
        type: 'Sleep'
    },
    {
        id: 's2',
        title: 'Focus Flow',
        description: 'Binaural beats and deep concentration frequencies.',
        length: '45 min',
        tracks: ['2', '6', '10', '9'],
        coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80',
        type: 'Focus'
    },
    {
        id: 's3',
        title: 'Anxiety Release',
        description: 'Wash away stress with cosmic frequencies and ethereal textures.',
        length: '30 min',
        tracks: ['3', '9', '7', '10'],
        coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
        type: 'Calm'
    },
    {
        id: 's4',
        title: 'Cosmic Expansion',
        description: 'Explore the outer edges of consciousness with a blend of exclusive tracks.',
        length: '90 min',
        tracks: ['1', '3', '7', '8', '11', '10'],
        coverImage: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=80',
        type: 'Trip'
    }
];
