# Autentikacija

Ovaj API koristi **HTTP Basic autentikaciju**.

### Kako koristiti

Za svaki zahtjev prema zaštićenim rutama, moraš uključiti HTTP Basic Auth header.

U Postmanu ili sličnom alatu:

- Postavi **Authorization type** na `Basic Auth`
- Unesi sljedeće podatke:

    - **Username (Email)**: `test@example.com`
    - **Password**: `lozinka123`

Svi zahtjevi će automatski imati odgovarajući `Authorization` header u formatu:
