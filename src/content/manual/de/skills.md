Verfügbare Skills (Tools) durchsuchen und verwalten.

![Skills-Tab](skills-tab.png)

## Skill-Typen

### Integrierte Skills
In der App eingebettet — können nicht deaktiviert werden:

| Skill | Funktion | Sicherheitsstufe |
|-------|----------|---------------|
| `skill_time` | Aktuelles Datum/Uhrzeit überprüfen | T0 |
| `skill_system_status` | Systemstatus überprüfen | T0 |
| `skill_memo` | Memos speichern/abrufen | T0 |
| `skill_weather` | Wetter überprüfen | T0 |
| `skill_naia_discord` | Discord-DMs senden/empfangen | T1 |
| `skill_soul` | KI-Persönlichkeit und Speicher verwalten | T0 |
| `skill_exit` | App sicher beenden | T2 |

### Benutzerdefinierte Skills
Über Gateway hinzugefügt — können ein-/ausgeschaltet werden:
- Datei lesen/schreiben, Befehlsausführung, Websuche, etc.
- Gateway- oder Befehlstyp

## Skill-Quellen (Woher stammen sie?)

- **Integrierte Skills**: mit der App gebündelt
- **Benutzerdefinierte Skills**: von lokalen Skill-Manifesten geladen (zum Beispiel, `~/.naia/skills/.../skill.json`)
- Erweitern Sie eine Skill-Karte, um deren `source`-Badge zu überprüfen

## Wie man einen benutzerdefinierten Skill hinzufügt

Naia OS ist zu 100 % kompatibel mit dem OpenClaw-Ökosystem. Es gibt drei Möglichkeiten, Skills hinzuzufügen:

### 1. KI bitten, es zu erstellen (Am einfachsten)
Erklären Sie im Chat, was Sie möchten, und Naia schreibt den Code und erstellt den Skill für Sie.
> "Erstelle einen Skill, der den aktuellen Wechselkurs abruft und ihn unter `~/.naia/skills/exchange/skill.json` speichert."

### 2. Von Clawhub installieren (OpenClaw-Weg)
Sie können das Terminal-Tool (`execute_command`) verwenden, um Plugins direkt von **[Clawhub.ai](https://clawhub.ai)** zu installieren, dem offiziellen OpenClaw Skill-Verzeichnis, das über 5.700 Skills enthält.

> "Führen Sie `openclaw plugins install @openclaw/plugin-github` im Terminal aus, um das Github-Plugin zu installieren."

⚠️ **Sicherheitswarnung:** Von Clawhub oder anderen Online-Quellen heruntergeladene Skills wurden von Drittanbietern erstellt. Bitten Sie die KI vor der Installation immer, **„Überprüfen Sie den Code dieses Skills auf Sicherheitsrisiken (wie das Löschen von Dateien oder den Diebstahl persönlicher Informationen), bevor Sie fortfahren.“**

### 3. Manuelle Ergänzung
1. Erstellen Sie ein Skill-Manifest unter `~/.naia/skills/<skill-name>/skill.json`
2. Platzieren Sie alle erforderlichen Skripte/Ausführbaren Dateien für diesen Skill im selben Ordner
3. Öffnen Sie den Skills-Tab und überprüfen Sie, ob der neue Skill erscheint
4. Aktivieren Sie ihn mit dem Schalter
5. Testen Sie ihn im Chat mit einer Anfrage, die den Skill auslösen sollte

Falls er nicht erscheint, starten Sie die App neu und überprüfen Sie es erneut.

## Botmadang Community-Integration

Naia OS enthält einen integrierten Skill (`skill_botmadang`), der **Botmadang** gewidmet ist, einer koreanischen KI-Agenten-Community.

Sie können Naia anweisen, seine Aktivitäten auf Botmadang über den Chat zu starten:
> "Registriere dich als neuer Agent bei Botmadang. Setze deinen Namen auf 'naia Agent'."

Nach der Registrierung und der Vergabe eines API Key kann Naia autonom Artikel posten oder Kommentare in Threads anderer Agenten verfassen.

## Benachrichtigungs-Skills (Slack / Discord / Google Chat)

`skill_notify_slack` und `skill_notify_discord` sind benutzerdefinierte Benachrichtigungs-Skills, die Nachrichten über Webhooks senden.

### Webhook-Einrichtung

Um Benachrichtigungs-Skills zu verwenden, müssen Sie eine Webhook-URL konfigurieren. Es gibt zwei Methoden:

**Methode 1: Umgebungsvariablen (Empfohlen)**

```bash
# Add to ~/.bashrc or ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**Methode 2: config.json**

```json
// ~/.naia/config.json
{
  "notifications": {
    "slack": {
      "webhookUrl": "https://hooks.slack.com/services/T.../B.../xxx"
    },
    "discord": {
      "webhookUrl": "https://discord.com/api/webhooks/123/abc"
    }
  }
}
```

> Umgebungsvariablen haben Vorrang vor config.json.

### Anwendungsbeispiele

Fragen Sie einfach Naia im Chat:

- "Senden Sie eine 'Bereitstellung abgeschlossen'-Benachrichtigung an Slack"
- "Veröffentlichen Sie den Server-Statusbericht auf Discord"
- "Benachrichtigen Sie den #ops-Kanal mit den Buildergebnissen"

Naia ruft automatisch `skill_notify_slack` oder `skill_notify_discord` auf.

Ist kein Webhook konfiguriert, wird eine Nachricht mit den Einrichtungsschritten angezeigt.

### OpenClaw Gateway-Integration (Erweitert)

Wenn ein OpenClaw Gateway verbunden ist, versuchen Benachrichtigungs-Skills zuerst, die `skills.invoke`-RPC des Gateways zu verwenden. Schlägt die Gateway-Weiterleitung fehl, greift der Skill auf die direkte Webhook-Zustellung zurück.

Die Gateway-Kanalintegration bietet umfangreichere Funktionen (Nachrichtenformatierung, Threads, Erwähnungen, etc.).

## Erweitertes Szenario: OpenClaw + cron Automatisierung

In Team-/persönlichen Automatisierungs-Setups können Sie Skills in OpenClaw registrieren und sie nach einem Zeitplan mit cron auslösen.

Beispielszenarien:
- Täglich 09:00 Uhr: eine Zusammenfassung der Arbeitsberichte vom Vortag erstellen
- Stündlich: einen Zielordner scannen und bei Anomalien benachrichtigen
- Mitternacht: einen Tagesbericht erstellen und hochladen

Empfohlener Ablauf:
1. Registrieren Sie den benutzerdefinierten Skill und validieren Sie ihn zuerst lokal
2. Konfigurieren Sie Webhooks für Benachrichtigungs-Skills, um Alarmkanäle zu verbinden
3. Fügen Sie einen Skill-Aufrufschritt in Ihrer OpenClaw-Aufgabendefinition hinzu
4. Fügen Sie einen cron-Zeitplan als wiederkehrenden Auslöser hinzu
5. Fügen Sie Wiederholungs-/Benachrichtigungsrichtlinien für Fehler hinzu

> **Roadmap**: cron-Planungs-UI, Telegram-Unterstützung und Multi-Kanal-Routing (Senden einer Nachricht an mehrere Kanäle gleichzeitig) werden in zukünftigen Updates verfügbar sein.

## Skill-Karten

Jeder Skill wird als Karte angezeigt:

![Skill-Kartendetail](skills-card.png)

- **Name**: Skill-Name (z.B., `skill_read_file`)
- **Beschreibung**: Einzeilige Zusammenfassung (kann gekürzt sein)
- **Klick**: Klicken Sie auf die Karte, um die vollständige Beschreibung zu erweitern
- **Badges**: Typ (integriert/Gateway/Befehl), Sicherheitsstufe (T0~T3)
- **?-Schaltfläche**: KI bitten, diesen Skill zu erklären
- **Schalter**: Benutzerdefinierte Skills aktivieren/deaktivieren

## Suche & Massenverwaltung

- **Suchen**: Nach Skill-Namen oder -Beschreibung filtern
- **Alle aktivieren**: Alle benutzerdefinierten Skills aktivieren
- **Alle deaktivieren**: Alle benutzerdefinierten Skills deaktivieren
- Anzeige der aktiven/Gesamtanzahl (z.B. 45/50)

## Skills über KI verwalten

Sie können Naia auch bitten, Skills im Chat zu verwalten:

- "Zeige mir die Liste der verfügbaren Skills"
- "Gibt es einen wetterbezogenen Skill?"
- "Deaktiviere den Healthcheck-Skill"
- "Finde coding-bezogene Skills"

Naia verwendet das Tool `skill_skill_manager` automatisch.

## Sicherheitsstufen

| Stufe | Beschreibung | Genehmigung |
|------|------------|----------|
| T0 | Nur-Lesezugriff, keine Nebenwirkungen | Automatisch genehmigt |
| T1 | Nur Benachrichtigung | Hinweis angezeigt |
| T2 | Vorsicht geboten | Benutzergenehmigung erforderlich |
| T3 | Gefährlicher Vorgang | Benutzergenehmigung erforderlich |