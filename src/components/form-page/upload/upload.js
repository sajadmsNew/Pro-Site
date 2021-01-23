import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import styles from "./files.module.scss";
import Dropzone from "react-dropzone-uploader";
import "./files.module.scss";
import "./files.css";
import deleteDocument from "../../../images/deleteDocument.svg";
import documentPicture from "../../../images/documentPicture.svg";
import addPicture from "../../../images/addPicture.svg";
import * as actions from "../../../action";
import { connect } from "react-redux";
import { setLeadField, getFileUrl } from "../../../utils/utils";
import _ from "lodash";
import Spinner from "react-spinkit";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      filesPreparing: 0,
      filesDone: 0,
      filesToUpload: [],
    };
  }

  handleChangeStatus = (element, status) => {
    let { filesPreparing, filesDone, filesToUpload } = this.state;
    if ("preparing" === status) {
      filesPreparing++;
      this.setState({ filesPreparing });
    } else if (status === "done") {
      filesDone++;
      filesToUpload.push(element);
      this.setState({ filesDone, filesToUpload });
    }
    if (filesPreparing === filesDone) {
      this.uploadFiles();
    }
  };

  // Upload files in a sync way. This is because upload a file will create a lead in BO and we need to
  // have leadId after upload the first element just before upload the second
  uploadFiles = () => {
    const filesToUpload = this.state.filesToUpload;
    const self = this;
    if (filesToUpload.length > 0) {
      const element = filesToUpload.pop();
      const { meta, file } = element;
      this.setState({ isUploading: true, filesToUpload });
      this.props.uploadFile(
        this.props.magicLinkToken,
        file,
        this.updateLeadInfo,
        this,
        file.type.includes("image") ? "images" : "documents"
      );
    } else {
      // Reset the state because we have no more elements to upload
      this.setState({
        isUploading: false,
        filesPreparing: 0,
        filesDone: 0,
        filesToUpload: [],
      });
    }
  };

  updateLeadInfo = (context, data) => {
    if (data) {
      // Magic link comes from data.
      // When there is no lead created this method will insert an empty one and return a magicLink
      const magicToken = data.magicLink;
      if (!context.props.magicLink) {
        this.props.setMagicLink(magicToken);
      }
      const lead = { ...context.props.lead };
      lead.cart[context.props.cartIndex][context.props.field].push(data.fileId);
      lead.isArchived = true;
      context.props.updateLead(magicToken, lead);
    }
    this.uploadFiles();
  };

  deleteDocument = event => {
    this.props.deleteFile(
      this.props.magicLinkToken,
      event.currentTarget.dataset.fileid,
      this.updateLeadAfterDelete,
      this
    );
  };

  updateLeadAfterDelete = (context, fileId) => {
    const magicToken = context.props.magicLinkToken;
    const lead = { ...context.props.lead };
    let filesCollection =
      lead.cart[context.props.cartIndex][context.props.field];
    filesCollection = _.remove(filesCollection, f => f === fileId);
    context.props.updateLead(magicToken, lead);
  };

  getAccept = () => {
    if (this.props.type === "images") {
      return "image/*";
    }
    if (this.props.type === "documents") {
      return "*";
    }
    return "*";
  };

  uploadedFiles = () => {
    let items = [];
    if (this.props.lead.cart[this.props.cartIndex]) {
      items = this.props.lead.cart[this.props.cartIndex][this.props.field];
    }
    const self = this;
    return items.map((fileId, index) => {
      const file = _.find(self.props.files, f => f._id === fileId);
      if (!file) {
        return null;
      }
      return <>{self.drawFile(self.props.field, file, index)}</>;
    });
  };

  drawFile = (field, file, index) => {
    return (
      <>
        {"materialImages" !== field ? (
          <div className={styles.documentsUploadedWrapper} key={index}>
            <img className={styles.imagesUploaded} src={documentPicture} />
            <span>{file.name}</span>
            <img
              data-fileid={file._id}
              onClick={this.deleteDocument}
              className={styles.deleteDocument}
              src={deleteDocument}
            />
          </div>
        ) : (
          <div className={styles.imagesUploadedWrapper} key={index}>
            <img className={styles.imageData} src={getFileUrl(file)} />
            <img
              data-fileid={file._id}
              onClick={this.deleteDocument}
              className={styles.deleteImage}
              src={deleteDocument}
            />
          </div>
        )}
      </>
    );
  };

  render() {
    const { t } = this.props;

    const isUploading = this.state.isUploading;
    return (
      <div className={styles.dropdownAreaWrapper}>
        <div className={styles.dropdownAreaMessage}>
          {isUploading ? (
            <Spinner name="ball-spin-fade-loader" />
          ) : (
            <>
              <img src={addPicture} alt="Plus symbol" />
              <span>
                {t("Drag files or click to browser for")} {this.props.type}
              </span>
            </>
          )}
        </div>
        <Dropzone
          onChangeStatus={this.handleChangeStatus}
          accept={this.getAccept()}
          styles={{
            dropzone: {
              border: "2px dashed #D9D9DA",
              minHeight: 200,
              maxHeight: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              marginTop: "30px",
            },
            inputLabel: (files, extra) =>
              extra.reject ? { color: "red" } : {},
          }}
          multiple={true}
        />
        {"materialImages" !== this.props.field ? (
          <div className={styles.uploadedDocuments}>{this.uploadedFiles()}</div>
        ) : (
          <div className={styles.uploadedImages}>{this.uploadedFiles()} </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    files: leadForm.files,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Upload));
