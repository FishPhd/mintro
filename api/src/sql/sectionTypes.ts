const sectionTypesMigrationSQL = `


INSERT INTO
    section_types (
        id,
        name,
        type,
        item_names,
        tagline,
        input_type,
        max_items,
        created_at,
        updated_at,
        hidden
    )
VALUES
    (
        1,
        'Introduction',
        'About Me',
        'Introduction',
        'Introduce yourself!',
        'textarea',
        1,
        '2021-09-27 19:37:20.135542',
        '2021-09-27 19:37:20.135542',
        false
    ),

(
    2,
    'Life Update',
    'About Me',
    'Update',
    'Talk about a new and exciting thing in your life!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    3,
    'Passions',
    'About Me',
    'Passion',
    'Talk about your passions!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    4,
    'Goals',
    'About Me',
    'Goal',
    'Talk about your goals!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    5,
    'Bucket List',
    'About Me',
    'Item',
    'Talk about your bucket list!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    6,
    'Adversity',
    'About Me',
    'Adversity',
    'Talk about something challenging to you!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    7,
    'I take pride in...',
    'About Me',
    'Thing',
    'Talk abotu something you are proud of!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    8,
    'I''m thankful for',
    'About Me',
    'Thing',
    'Talk about something you are thankful for!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    9,
    'Contact Info',
    'About Me',
    'Info',
    'How people can reach you!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    10,
    'Learning...',
    'I''m Currently',
    'Thing',
    'Something you are learning!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    11,
    'Looking for...',
    'I''m Currently',
    'Thing',
    'Something you are looking for!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    12,
    'Seeking',
    'I''m Currently',
    'Thing',
    'Something you are seeking!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    13,
    'Reading...',
    'I''m Currently',
    'Book',
    'Books/Plays/Articles you are reading!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    14,
    'Planning',
    'I''m Currently',
    'Thing',
    'Something you are planning to do!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    15,
    'Studying for...',
    'I''m Currently',
    'Thing',
    'Something you are studying for! Other can help!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    16,
    'Looking forward to...',
    'I''m Currently',
    'Thing',
    'Something you are looking forward to!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    17,
    'Activities',
    'I''m Currently',
    'Activity',
    'An activity you partake in!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    18,
    'Outdoors',
    'I''m Currently',
    'Activity',
    'An activity you enjoy outdoors!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    19,
    'Indoors',
    'I''m Currently',
    'Activity',
    'An activity you enjoy indoors!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    20,
    'Sports',
    'I''m Currently',
    'Sport',
    'A team/sport you follow!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    21,
    'Artists',
    'I''m Currently',
    'Artist',
    'Artists you enjoy!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    22,
    'Media',
    'I''m Currently',
    'Thing',
    'Media content you enjoy!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    23,
    'Restaurant',
    'My ____ Recommendations',
    'Restaurant',
    'Favorite restaurant',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    24,
    'Travel',
    'My ____ Recommendations',
    'Travel',
    'Favorite place to travel!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    25,
    'Book',
    'My ____ Recommendations',
    'Book',
    'Favorite books!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    26,
    'TV Show',
    'My ____ Recommendations',
    'TV Show',
    'Favorite TV Shows!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    27,
    'Movie',
    'My ____ Recommendations',
    'Movie',
    'Favorite Movies!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    28,
    'Music',
    'My ____ Recommendations',
    'Music',
    'Favorite music!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    29,
    'Podcast',
    'My ____ Recommendations',
    'Podcast',
    'Favorite Podcasts!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    30,
    'Local',
    'My ____ Recommendations',
    'Spot',
    'Favorite local spots!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    31,
    'Documentary',
    'My ____ Recommendations',
    'Documentary',
    'Favorite Documentaries!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    32,
    'Shopping',
    'My ____ Recommendations',
    'Store',
    'Favorite Places to shop!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    33,
    'Help me...',
    'Can you',
    'Skill',
    'Something oyu want to learn!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    34,
    'Recommend',
    'Can you',
    'Thing',
    'Something you want recommendations for!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    35,
    'Share advice on...',
    'Can you',
    'Thing',
    'Something you want advice for!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    36,
    'I can teach you...',
    'Offers',
    'Thing',
    'Something oyu want to teach!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    37,
    'I love to help people...',
    'Offers',
    'Thing',
    'Something you want to help with!',
    'textarea',
    1,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    38,
    'Causes I support',
    'Community',
    'Cause',
    'Causes you support!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    39,
    'Favorite Charities',
    'Community',
    'Charity',
    'Charities you support!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
),

(
    40,
    'Where I volunteer',
    'Community',
    'Place',
    'Places you volunteer at!',
    'input',
    3,
    '2021-09-27 19:37:20.135542',
    '2021-09-27 19:37:20.135542',
    false
)
  `;
export default sectionTypesMigrationSQL;
