Dieser Tab verwaltet verschiedene mit der App verbundene Messaging-Kanäle (Discord, Slack, Google Chat, Telegram usw.).

![Channels Tab](channels-tab.png)

## Kanalliste anzeigen
Sie können alle verbundenen Kanäle und den Status jedes Kontos auf einen Blick sehen.

- **Statusabzeichen**: Zeigt Zustände wie `connected`, `disconnected` oder `error` an.
- **Aktualisieren**: Klicken Sie auf die Schaltfläche "Aktualisieren" oben rechts, um den neuesten Status abzurufen.

## Kanal-Login (QR-Code)
Sie können einen Web-Login initiieren, um einen bestimmten Kanal zu verbinden.
Wenn Sie dem KI-Avatar im Chat sagen: "Start Discord web login", wird ein QR-Code angezeigt oder bei Bedarf ein Authentifizierungs-Wartezustand eingeleitet.

## Discord Bot-Integration

Melden Sie sich mit Ihrem Discord-Konto unter [naia.nextain.io](https://naia.nextain.io) an, um Ihr Konto automatisch zu verknüpfen. Nach der Verknüpfung können Sie über Discord-DM mit Naia chatten.

### Verwendung
1. **Melden Sie sich mit Discord an** unter naia.nextain.io
2. Ihr Konto wird automatisch mit dem Naia-Bot verknüpft
3. **Senden Sie dem Bot eine DM**, um den Chat zu starten
4. Guthaben werden automatisch von Ihrem naia.nextain.io-Konto abgebucht

### Funktionen
- **Nur DM**: Naia antwortet auf Direktnachrichten von verknüpften Benutzern
- **Guthaben-Integration**: Guthaben von Ihrem naia.nextain.io-Konto werden automatisch verwendet
- **Anleitung für nicht registrierte Benutzer**: Benutzer ohne verknüpftes Konto erhalten Einrichtungsanweisungen
- **Ratenbegrenzung**: 10 Nachrichten pro Minute Limit zum Schutz Ihres Guthabens

## Google Chat-Integration (Demnächst verfügbar)

Die Google Chat-Integration ist für ein zukünftiges Update geplant. Bleiben Sie auf dem Laufenden.

## Messenger-Benachrichtigungen (Webhooks)
Naia OS erbt das leistungsstarke Kanalsystem von OpenClaw.
Indem Sie Ihre Slack-, Discord- oder Google Chat-Webhook-URL im Menü **Einstellungen > Tools > Webhooks** oder während des anfänglichen Onboarding-Bildschirms eingeben, kann der KI-Avatar Ihnen Nachrichten mit den Ergebnissen wichtiger Aufgaben senden.

> **Tipp:** "Informiere mich auf Discord, wenn dieses Dateibackup vollständig abgeschlossen ist!"

## Erweitert: Einen autonomen 24/7-Bot erstellen
Durch die Nutzung des Terminal-Befehlswerkzeugs (`execute_command`) können Sie den KI-Avatar in einen autonomen 24/7-Agenten verwandeln, der in Telegram oder Discord residiert, über Ihren Desktop hinaus.

Befehlen Sie dem KI-Avatar im Chat so:
> "Mein Telegram Bot-Token ist `1234:ABC...`. Führen Sie `openclaw channels add --channel telegram --token 1234:ABC...` aus, um meinen Telegram Bot zu starten."

Selbst wenn Sie die Desktop-App schließen, können Sie jetzt jederzeit über Telegram auf Ihrem Telefon mit dem KI-Avatar chatten und Aufgaben zuweisen, dank des Hintergrund-OpenClaw Gateways.