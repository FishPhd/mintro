const sociualMediaTypesMigrationSQL = `
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
    )
  `;
export default sociualMediaTypesMigrationSQL;
