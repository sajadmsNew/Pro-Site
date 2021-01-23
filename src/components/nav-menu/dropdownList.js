import React from "react";

import { withNamespaces } from "react-i18next";

import Dropdown from "./dropdown";
class NavMenuDropdownList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openKey: "",
    };

    this.updateKey = this.updateKey.bind(this);
  }
  updateKey(value) {
    this.setState({ openKey: value });
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <Dropdown
          openKey={this.state.openKey}
          updateKey={this.updateKey}
          view={this.props.view}
          key={"schrottpreise"}
          element={"schrottpreise"}
          dropdownLabel={"Schrottpreise"}
          linkList={[
            {
              url: "/altmetall-ankauf/",
              label: "Altmetall Ankauf",
            },

            {
              url: "/altmetall-ankauf/aluminium/",
              label: "Aluminium",
            },
            {
              url: "/altmetall-ankauf/blei/",
              label: "Blei",
            },

            {
              url: "/altmetall-ankauf/edelstahl/",
              label: "Edelstahl",
            },
            {
              url: "/altmetall-ankauf/eisen-und-stahl/",
              label: "Eisen und Stahl",
            },
            {
              url: "/altmetall-ankauf/elektronik/",
              label: "Elektroschrott",
            },
            {
              url: "/altmetall-ankauf/hartmetall-hss/",
              label: "Hartmetall und HSS",
            },

            {
              url: "/altmetall-ankauf/kupfer-kabel/",
              label: "Kabel",
            },
            {
              url: "/altmetall-ankauf/kupfer/",
              label: "Kupfer",
            },
            {
              url: "/altmetall-ankauf/messing/",
              label: "Messing",
            },
            {
              url: "/altmetall-ankauf/legierungen-cu-ni/",
              label: "Rotguss/Legierunge",
            },
            {
              url: "/altmetall-ankauf/zink/",
              label: "Zink",
            },
            {
              url: "/altmetall-ankauf/zinn/",
              label: "Zinn",
            },
          ]}
        />

        <Dropdown
          openKey={this.state.openKey}
          updateKey={this.updateKey}
          view={this.props.view}
          key={"verkaufen"}
          element={"verkaufen"}
          dropdownLabel={"Verkaufen"}
          linkList={[
            {
              url: "/pro/",
              label: "Altmetallpreis anfragen",
            },

            {
              url: "/altmetall-ankauf/",
              label: "Kleine Mengen verkaufen",
            },
          ]}
        />

        <Dropdown
          openKey={this.state.openKey}
          updateKey={this.updateKey}
          view={this.props.view}
          key={"kaufen"}
          element={"kaufen"}
          dropdownLabel={"Kaufen"}
          linkList={[
            {
              url: "/altmetall-kaufen/",
              label: "Altmetall kaufen",
            },

            {
              url: "/partner/",
              label: "Schrott24 Partner werden",
            },
            {
              url: "/partnerwebshop/",
              label: "Ihr Webshop",
            },
          ]}
        />

        <Dropdown
          openKey={this.state.openKey}
          updateKey={this.updateKey}
          view={this.props.view}
          key={"kunden"}
          element={"kunden"}
          dropdownLabel={"Kunden"}
          linkList={[
            {
              url: "/pro/",
              label: "Industrie",
            },

            {
              url: "/altmetall-ankauf/",
              label: "Gewerbe/Handwerk",
            },
            {
              url: "/altmetall-kaufen/",
              label: "Endverbraucher (Schmelzen, Hütten, etc.)",
            },

            {
              url: "/partner-werden/",
              label: "Altmetallhändler",
            },
            {
              url: "/altmetall-ankauf/",
              label: "Privat",
            },

            {
              url: "/kontaktformular/",
              label: "Kontaktformular",
            },
          ]}
        />

        <Dropdown
          openKey={this.state.openKey}
          updateKey={this.updateKey}
          view={this.props.view}
          key={"uber-uns"}
          element={"uber-uns"}
          dropdownLabel={"Über uns"}
          linkList={[
            {
              url: "/support/",
              label: "So funktioniert's",
            },

            {
              url: "/standorte/",
              label: "Standorte",
            },
            {
              url: "/presse/",
              label: "Presse",
            },

            {
              url: "/blog/",
              label: "Blog ",
            },
            {
              url: "/ueber-uns/",
              label: "Über uns",
            },
          ]}
        />
      </>
    );
  }
}

export default withNamespaces()(NavMenuDropdownList);
