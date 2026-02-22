Konfigurieren Sie alle App-Einstellungen. Klicken Sie auf **Speichern**, um Änderungen zu übernehmen.

![Einstellungen-Übersicht](settings-overview.png)

## Sprache

- Wechseln Sie zwischen **Koreanisch** / **Englisch**
- Wird sofort angewendet

## Design

8 Farbdesigns verfügbar:

| Design | Stimmung |
|-------|---------|
| Espresso | Warmes Braun (Standard) |
| Midnight | Dunkles Marineblau |
| Ocean | Tiefblau |
| Forest | Natürliches Grün |
| Rose | Rosenviolett |
| Latte | Heller Cremeton |
| Sakura | Kirschblütenrosa |
| Cloud | Helles Grau |

Klicken Sie auf ein Farbfeld für eine sofortige Vorschau.

## Avatar

### VRM-Modell
- Wählen Sie aus 4 integrierten Modellen oder klicken Sie auf **Datei wählen**, um ein benutzerdefiniertes VRM zu laden
- Klicken Sie für eine sofortige Vorschau
- Wenn Sie ohne Speichern verlassen, wird das vorherige Modell wiederhergestellt

### Hintergrundbild
- Standardverlauf oder integrierte Hintergründe
- **Datei wählen**, um ein benutzerdefiniertes Bild zu laden (PNG, JPG, WebP)

## Persona

Passen Sie die Persönlichkeit, den Sprachstil und den Namen von Naia im Freitext an. Emotions-Tags werden automatisch hinzugefügt.

![Persona-Einstellungen](settings-persona.png)

## Nextain-Konto

Verwalten Sie die Nextain-Integration.

### Wenn verbunden

- Benutzer-ID wird angezeigt
- **Guthabenstand** wird angezeigt (Echtzeitabfrage)
- Schaltfläche **Dashboard**: Öffnen Sie das Nextain-Dashboard im Browser
- Schaltfläche **Guthaben aufladen**: Gehen Sie zur Nextain-Abrechnungsseite
- Schaltfläche **Trennen**: Nextain-Konto entknüpfen
- Einstellungen werden beim Speichern automatisch mit Nextain synchronisiert

### Wenn nicht verbunden
- Schaltfläche **Nextain-Login**: Melden Sie sich über den Browser an, automatische Verbindung

## Benutzerhandbuch

Klicken Sie auf „Benutzerhandbuch“, um diese Seite im Browser zu öffnen.

## KI-Einstellungen

- **Anbieter**: Gemini (Standard), OpenAI, Claude, Grok, xAI, Ollama, Claude Code CLI
- **Modell**: Modellname (z.B. gemini-2.5-flash)
- **API Key**: Anbieter-API-Schlüssel (nicht erforderlich, wenn Nextain verwendet wird)

## Stimme (TTS/STT)

- **Sprachausgabe (TTS)**: AN/AUS
- **Spracheingabe (STT)**: AN/AUS
- **Google API Key**: Dedizierter TTS/STT-Schlüssel (leer lassen, um den Chat-Schlüssel zu verwenden)
- **TTS-Stimme**: Wählen Sie aus 11 koreanischen Stimmen
  - Neural2: Hohe Qualität (16 $/1 Mio. Zeichen)
  - WaveNet: Natürlich (16 $/1 Mio. Zeichen)
  - Standard: Grundlegend (4 $/1 Mio. Zeichen)
- Schaltfläche **Vorschau**, um die ausgewählte Stimme zu testen

## Tools

Verwalten Sie die Systemsteuerungsberechtigungen, die dem KI-Avatar zur Verfügung stehen.

- **Tools aktivieren**: Haupt-AN/AUS für Tool-Funktionen
- **Gateway URL / Gateway Token**: In normalen Benutzerumgebungen automatisch verwaltet, daher ist keine manuelle Eingabe erforderlich
  - Nur fortgeschrittene Benutzer, die ein selbst gehostetes Gateway betreiben, müssen diese Werte überprüfen/bearbeiten
- **Zugelassene Tools**: Als „Immer zulassen“ markierte Tools
  - **Zugelassene Tools löschen**: Alle Genehmigungen zurücksetzen

> **Leitfaden für Sicherheitsstufen (T0~T3)**
> Ein 4-stufiges Sicherheitssystem wird angewendet, basierend auf den Systemauswirkungen, wenn die KI ein Tool verwendet.
> - **T0 (Nur Lesezugriff)**: Abfrageaufgaben. Wird automatisch ohne Benutzereingriff ausgeführt.
> - **T1 (Benachrichtigen)**: Einfache externe Suche/Benachrichtigung. Zeigt bei Ausführung eine Warnung auf dem Bildschirm an.
> - **T2 (Vorsicht)**: Systemänderungen wie das Erstellen/Bearbeiten von Dateien. Erfordert eine explizite Benutzergenehmigung.
> - **T3 (Gefährlich)**: Gefährliche Aufgaben wie das Ausführen von Terminalbefehlen. Erfordert jedes Mal eine Genehmigung.

## Kanäle

- **Kanalverwaltung**: Überprüfen Sie den Status verbundener Messenger-Kanäle und steuern Sie die Integration mit externen Diensten.
- (Die detaillierte Steuerung erfolgt im Tab „Kanäle“.)

## Integrationen

Verwalten Sie externe Messenger-Integrationen auf der Seite **Einstellungen > Integrationen**.

- **Discord Integration**: Automatisch verknüpft, wenn Sie sich mit Discord anmelden. Senden Sie dem Bot eine DM, um mit Naia zu chatten.
- **Google Chat Integration**: Für ein zukünftiges Update geplant.
- Der Verbindungsstatus (verbunden/nicht verbunden) wird als Badges angezeigt.

## Gerät & Aktivierungswort

![Geräteeinstellungen](settings-device.png)

- **Aktivierungswort-Liste**: Verwalten Sie Wörter, um die KI zu aktivieren (z.B. „Hey Naia“, „Hello Naia“)
- **Gerätekopplung**: Verwalten Sie externe Geräteintegrationen (z.B. gekoppelte OpenClaw-Knoten) und Verbindungen mit Smart-Home-Geräten.
- Enthält Funktionen für die Gerätefreigabe und das Zurücksetzen von Tokens.

## Speicher (Fakten)

Verwalten Sie Fakten, die Naia aus Gesprächen gelernt hat.
- Jede Tatsache zeigt einen **Schlüssel** und einen **Wert**
- Schaltfläche **Löschen**, um unnötige Fakten zu entfernen
- Gespeicherte Fakten beeinflussen die Personalisierung der Antworten in späteren Chats
- Das Löschen vieler Fakten kann die Qualität der Personalisierung beeinträchtigen

## Speichern & Zurücksetzen

- **Speichern**: Alle Änderungen übernehmen
- **Alle zurücksetzen**: Alle Einstellungen und die Kamera auf die Standardwerte zurücksetzen (erfordert Bestätigung)