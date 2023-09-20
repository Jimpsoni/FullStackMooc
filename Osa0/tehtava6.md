```mermaid
    sequenceDiagram
    participant Selain
    participant Palvelin

    Note right of Selain: Kirjoitetaan viesti ja painetaan "Save"

    Selain->>Palvelin: POST /exampleapp/new_note_spa
    activate Palvelin
    Palvelin-->>Selain: {message: "note created"}
    deactivate Palvelin

    Note right of Selain: Selain päivittää sivun asettamalla uuden viestin suoraan listaan käyttäen javascriptiä

```
