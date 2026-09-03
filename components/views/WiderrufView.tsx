import { LegalShell } from "@/components/site/LegalShell";
import type { Locale } from "@/lib/i18n";
import { ANBIETER, ANBIETER_BLOCK, RUECKSENDEKOSTEN } from "@/lib/legal";

// ─────────────────────────────────────────────────────────────────────────────
// Widerrufsbelehrung nach dem AMTLICHEN MUSTER
// (Anlage 1 zu Art. 246a § 1 Abs. 2 Satz 2 EGBGB) plus das
// Muster-Widerrufsformular (Anlage 2).
//
// Der Wortlaut des Musters ist bewusst NICHT umformuliert: Wer das amtliche
// Muster zutreffend ausgefüllt verwendet, genießt die Gesetzlichkeitsfiktion —
// die Belehrung gilt dann als ordnungsgemäß. Eigene Formulierungen verlieren
// diesen Schutz. Nur die Platzhalter sind gefüllt.
//
// Ohne diese Belehrung verlängert sich die Widerrufsfrist auf 12 Monate und
// 14 Tage (§ 356 Abs. 3 BGB) — und sie ist abmahnfähig.
// ─────────────────────────────────────────────────────────────────────────────

export function WiderrufView({ lang }: { lang: Locale }) {
  const kundeTraegt = RUECKSENDEKOSTEN === "kunde";

  if (lang === "en") {
    return (
      <LegalShell eyebrow="Legal" title="Right of withdrawal">
        <p>
          <em>
            This is a courtesy translation. Only the German version is legally binding.
          </em>
        </p>

        <h2>Right of withdrawal</h2>
        <p>You have the right to withdraw from this contract within 14 days without giving any reason.</p>
        <p>
          The withdrawal period will expire after 14 days from the day on which you acquire, or a third
          party other than the carrier and indicated by you acquires, physical possession of the goods.
        </p>
        <p>
          To exercise the right of withdrawal, you must inform us ({ANBIETER_BLOCK}) of your decision to
          withdraw from this contract by an unequivocal statement (for example, a letter sent by post or
          an email). You may use the attached model withdrawal form, but it is not obligatory.
        </p>
        <p>
          To meet the withdrawal deadline, it is sufficient for you to send your communication concerning
          your exercise of the right of withdrawal before the withdrawal period has expired.
        </p>

        <h2>Effects of withdrawal</h2>
        <p>
          If you withdraw from this contract, we shall reimburse to you all payments received from you,
          including the costs of delivery (with the exception of the supplementary costs resulting from
          your choice of a type of delivery other than the least expensive type of standard delivery
          offered by us), without undue delay and in any event not later than 14 days from the day on
          which we are informed about your decision to withdraw from this contract. We will carry out
          such reimbursement using the same means of payment as you used for the initial transaction,
          unless you have expressly agreed otherwise; in any event, you will not incur any fees as a
          result of such reimbursement.
        </p>
        <p>
          We may withhold reimbursement until we have received the goods back or you have supplied
          evidence of having sent back the goods, whichever is the earliest.
        </p>
        <p>
          You shall send back the goods or hand them over to us without undue delay and in any event not
          later than 14 days from the day on which you communicate your withdrawal from this contract to
          us. The deadline is met if you send back the goods before the period of 14 days has expired.
        </p>
        <p>
          {kundeTraegt
            ? "You will have to bear the direct cost of returning the goods."
            : "We will bear the cost of returning the goods."}
        </p>
        <p>
          You are only liable for any diminished value of the goods resulting from the handling other
          than what is necessary to establish the nature, characteristics and functioning of the goods.
        </p>

        <h2>Model withdrawal form</h2>
        <p>
          <em>
            (Complete and return this form only if you wish to withdraw from the contract.)
          </em>
        </p>
        <blockquote>
          <p>
            To {ANBIETER.name} ({ANBIETER.marke}), {ANBIETER.strasse}, {ANBIETER.plz} {ANBIETER.ort},
            {" "}{ANBIETER.land}, email: {ANBIETER.email}
          </p>
          <p>
            I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of the
            following goods (*):
          </p>
          <p>Ordered on (*) / received on (*):</p>
          <p>Name of consumer(s):</p>
          <p>Address of consumer(s):</p>
          <p>Signature of consumer(s) (only if this form is notified on paper):</p>
          <p>Date:</p>
          <p>
            <em>(*) Delete as appropriate.</em>
          </p>
        </blockquote>
      </LegalShell>
    );
  }

  return (
    <LegalShell title="Widerrufsbelehrung">
      <h2>Widerrufsrecht</h2>
      <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
      <p>
        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter
        Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({ANBIETER_BLOCK}) mittels einer eindeutigen
        Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss,
        diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
        Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
        Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
        haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus
        ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste
        Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
        zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen
        ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
        Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
        vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis
        Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der
        frühere Zeitpunkt ist.
      </p>
      <p>
        Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag,
        an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu
        übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen
        absenden.
      </p>
      <p>
        {kundeTraegt
          ? "Sie tragen die unmittelbaren Kosten der Rücksendung der Waren."
          : "Wir tragen die Kosten der Rücksendung der Waren."}
      </p>
      <p>
        Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf
        einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht
        notwendigen Umgang mit ihnen zurückzuführen ist.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        <em>
          (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden
          Sie es zurück.)
        </em>
      </p>
      <blockquote>
        <p>
          An {ANBIETER.name} ({ANBIETER.marke}), {ANBIETER.strasse}, {ANBIETER.plz} {ANBIETER.ort},
          {" "}{ANBIETER.land}, E-Mail: {ANBIETER.email}
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der
          folgenden Waren (*):
        </p>
        <p>Bestellt am (*) / erhalten am (*):</p>
        <p>Name des/der Verbraucher(s):</p>
        <p>Anschrift des/der Verbraucher(s):</p>
        <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
        <p>Datum:</p>
        <p>
          <em>(*) Unzutreffendes streichen.</em>
        </p>
      </blockquote>

      <h2>Ausschluss des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt
        sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch dich maßgeblich
        ist oder die eindeutig auf deine persönlichen Bedürfnisse zugeschnitten sind (§ 312g Abs. 2 Nr. 1
        BGB). Das betrifft ausschließlich eigens für dich angefertigte Einzelstücke — nicht die im Shop
        angebotenen Produkte.
      </p>
    </LegalShell>
  );
}
