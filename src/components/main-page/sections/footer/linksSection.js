import React from "react";
import { withNamespaces } from "react-i18next";
import footerStyles from "./footer.module.scss";
import styles from "./linksSection.module.scss";
import youtube from "../../../../images/youtube.png";
import facebook from "../../../../images/facebook.png";
import twitter from "../../../../images/twitter.png";
import linkedin from "../../../../images/linkedin.png";
import europe from "../../../../images/europe.png";
import ekomi from "../../../../images/ekomiWithStars.png";
import SocialMediaGroup from "./socialMediaGroup.js";
class LinksSection extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <div
          className={[footerStyles.footer, styles.footerLinksContainer].join(
            " "
          )}
        >
          <div
            className={[styles.footerLinks, styles.firstPartFooterLinks].join(
              " "
            )}
          >
            <div className={styles.columnEuro}>
              <img src={europe} alt="European flag" />
              <p>
                Dieses Projekt wurde im Rahmen der Finanzhilfevereinbarung Nr.
                816314 und 873076 aus den Forschungs- und Innovationsprogrammen
                der Europäischen Union für Horizont 2020 finanziert.
              </p>

              <img src={ekomi} alt="Ekomi logo" className={styles.ekomiLogo} />
            </div>

            <div
              className={[styles.columnUnternehmen, styles.unternehmen].join(
                " "
              )}
            >
              <div>
                <span className={styles.sectionTitle}>Unternehmen</span>
                <div className={styles.twoColumnsOfLinks}>
                  <div className={styles.listOfLinks}>
                    <a href="/ueber-uns/">Über uns</a>{" "}
                    <a href="/support/">So funktioniert's</a>{" "}
                    <a href="/karriere/">Karriere</a>{" "}
                    <a href="/presse/">Presse</a>
                  </div>
                  <div className={styles.listOfLinks}>
                    <a href="/blog/">Blog</a>{" "}
                    <a href="/nachhaltigkeit/">Nachhaltigkeit</a>{" "}
                    <a href="/standorte/">Standorte</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.columnServices}>
              <span className={styles.sectionTitle}>Services</span>

              <div className={styles.listOfLinks}>
                <a href="/demontage">Industrierückbau &amp; Demontagen </a>
                <a href="/kraftwerkdemontage">Kraftwerksrückbau</a>{" "}
                <a href="/windkraftwerkdemontage">
                  Demontage von Windkraftanlagen{" "}
                </a>
                <a href="/partner-werden/">Partner Webshop</a>
              </div>
            </div>

            <div
              className={[
                footerStyles.tablet,
                styles.socialMediaContainer,
              ].join(" ")}
            >
              <SocialMediaGroup />
            </div>
          </div>

          <div
            className={[styles.footerLinks, styles.secondPartFooterLinks].join(
              " "
            )}
          >
            <div className={footerStyles.desktop}>
              <SocialMediaGroup />
            </div>

            <div className={styles.columnUnternehmen}>
              <span className={styles.sectionTitle}>Altmetall verkaufen</span>
              <div className={styles.twoColumnsOfLinks}>
                <div className={styles.listOfLinks}>
                  <a href="/hartmetall-hss">Hartmetall verkaufen</a>{" "}
                  <a href="/edelstahl">Edelstahl verkaufen</a>{" "}
                  <a href="/zink">Zink verkaufen</a>{" "}
                  <a href="/messing">Messing verkaufen</a>{" "}
                  <a href="/kupfer-kabel">Kabel verkaufen</a>{" "}
                  <a href="/aluminium">Aluminium verkaufen </a>
                  <a href="/elektronik">E-Schrott verkaufen</a>
                </div>
                <div className={styles.listOfLinks}>
                  <a href="/blei">Blei verkaufen</a>{" "}
                  <a href="/legierungen-cu-ni">Legierungen verkaufen</a>{" "}
                  <a href="/zinn">Zinn verkaufe</a>{" "}
                  <a href="/kupfer">Kupfer verkaufen</a>{" "}
                  <a href="/eisen-und-stahl">Eisen verkaufen</a>{" "}
                  <a href="/eisen-und-stahl">Stahl verkaufen</a>
                </div>
              </div>
            </div>

            <div className={styles.columnServices}>
              <span className={styles.sectionTitle}>Schrottpreise</span>
              <div className={styles.twoColumnsOfLinks}>
                <div className={styles.listOfLinks}>
                  <a href="/schrottpreise">Schrottpreise</a>{" "}
                  <a href="/hartmetallpreis">Hartmetallpreis</a>{" "}
                  <a href="/edelstahlpreis">Edelstahlpreis</a>{" "}
                  <a href="/zinkpreis">Zinkpreis</a>{" "}
                  <a href="/messingpreis">Messingpreis</a>{" "}
                  <a href="/kabelpreis">Kabelpreis </a>
                  <a href="/aluminiumpreis">Aluminiumpreis</a>{" "}
                  <a href="/elektroschrottpreise">E-Schrottpreis</a>
                </div>
                <div className={styles.listOfLinks}>
                  <a href="/bleipreis">Bleipreis</a>{" "}
                  <a href="/legierungenpreis">Legierungenpreis</a>{" "}
                  <a href="/zinnpreis">Zinnpreis</a>{" "}
                  <a href="/kupferpreis">Kupferpreis</a>{" "}
                  <a href="/eisenpreis">Eisenpreis</a>{" "}
                  <a href="/stahlpreis">Stahlpreis</a>{" "}
                  <a href="/batteriepreis">Batteriepreis</a>
                </div>
              </div>
            </div>

            <div className={footerStyles.mobile}>
              <SocialMediaGroup />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNamespaces()(LinksSection);
