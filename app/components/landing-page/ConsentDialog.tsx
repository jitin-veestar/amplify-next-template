import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack, Typography } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

export default function ConsentDialog({
  open,
  setOpen,
  setValue,
  onSubmit = () => {},
}: any) {
  const t = useTranslations("Index");
  const signatureRef = useRef<any>();

  const handleClose = () => {
    setOpen(false);
  };

  const [consent, setConsent] = useState({
    name: "",
    sign: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    sign: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

    if (e.target.name === "name") {
      setValue("consent.name", e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!consent.name) {
      setErrors((prev) => ({ ...prev, name: t("consentPleaseFillValue") }));
      return;
    } else if (signatureRef.current?.isEmpty()) {
      setErrors((prev) => ({ ...prev, sign: t("consentPleaseSign") }));
      return;
    }
    handleChangeImage(
      signatureRef.current.getTrimmedCanvas().toDataURL("image/png")
    ).then(() => {
      onSubmit();
      handleClose();
    });
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const handleChangeImage = async (base64: string) => {
    setConsent((prev) => ({ ...prev, sign: base64 }));
    setValue("consent.sign", base64);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>{t("consentDialogTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>{t("consentDialogContentText1")}</p>
            <ul>
              <li>{t("consentDentalDamage")}</li>
              <li>{t("consentSoreThroat")}</li>
              <li>{t("consentHoarseVoice")}</li>
              <li>{t("consentNerveDamage")}</li>
              <li>{t("consentDrugReactions")}</li>
              <li>{t("consentBloodClots")}</li>
              <li>{t("consentLossOfSensation")}</li>
              <li>{t("consentLossOfLimbFunction")}</li>
              <li>{t("consentParalysis")}</li>
              <li>{t("consentInfection")}</li>
              <li>{t("consentLungAspiration")}</li>
              <li>{t("consentHeadaches")}</li>
              <li>{t("consentSeizures")}</li>
              <li>{t("consentStroke")}</li>
              <li>{t("consentBrainDamage")}</li>
              <li>{t("consentBleeding")}</li>
              <li>{t("consentBloodVesselDamage")}</li>
              <li>{t("consentAwarenessUnderAnesthesia")}</li>
              <li>{t("consentHeartAttackOrDeath")}</li>
              <li>{t("consentVisionDisturbance")}</li>
              <li>{t("consentOrganDamageDysfunction")}</li>
            </ul>
            <p>{t("consentRisksAreHigherBasedOn")}</p>
            <ul>
              <li>{t("consentPatientsBaselineMedicalCondition")}</li>
              <li>
                {t("consentIfPatientWithholdsPertinentMedicalInformation")}
              </li>
              <li>{t("consentDoesNotFollowMedicalInstructions")}</li>
              <li>{t("consentIfPatientEatsFoodWithin8Hours")}</li>
            </ul>
            <p>{t("consentAnestheticTechniqueDeterminedBy")}</p>
            <ul>
              <li>{t("consentMyPhysicalCondition")}</li>
              <li>{t("consentTypeOfProcedure")}</li>
              <li>{t("consentMyDoctorsPreference")}</li>
              <li>{t("consentMyOwnPreference")}</li>
            </ul>
            <p>{t("consentTypesOfAnesthesiaInclude")}</p>
            <ul>
              <li>{t("consentGeneralAnesthesia")}</li>
              <li>{t("consentRegionalAnesthesia")}</li>
              <li>{t("consentMonitoredAnesthesia")}</li>
            </ul>
            <p>{t("consentAllFormsOfAnesthesiaRequireIV")}</p>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label={t("consentYourName")}
              placeholder={t("consentEnterYourName")}
              value={consent.name || ""}
              onChange={handleChange}
              fullWidth
              variant="filled"
              error={!!errors.name}
              helperText={errors.name}
            />
            <ul>
              <li>
                {t("consentCertifyAndAcknowledge")}{" "}
                <span
                  style={{
                    minWidth: 80,
                    display: "inline-block",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {consent.name}
                </span>{" "}
                {t("consentReadForm")}
              </li>
              <li>
                {t("consentUnderstandRisks")}{" "}
                <span
                  style={{
                    minWidth: 80,
                    display: "inline-block",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {consent.name}
                </span>
              </li>
              <li>
                {t("consentConsentToAnesthesia")}{" "}
                <span
                  style={{
                    minWidth: 80,
                    display: "inline-block",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {consent.name}
                </span>
              </li>
            </ul>
            <Box
              sx={{
                backgroundColor: "white",
                border: "1px solid black",
                height: "150px",
                display: "flex",
              }}
            >
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                dotSize={1}
                backgroundColor="white"
                canvasProps={{
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Box>
            {errors.sign && !consent.sign ? (
              <Typography color="error" variant="body1">
                {t("consentPleaseSign")}
              </Typography>
            ) : (
              <></>
            )}
            <Stack
              direction="row"
              textAlign="center"
              alignItems="center"
              justifyContent="space-between"
              m={0.5}
            >
              <Typography>{t("consentPleaseSignAbove")}</Typography>
              <Button onClick={clearSignature}>{t("consentClear")}</Button>
            </Stack>
            <Stack direction="row" justifyContent="end">
              <Typography>
                {t("consentDate")}: {format(new Date(), "MM/dd/yyyy")}
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("consentCancel")}</Button>
          <Button onClick={handleSubmit}>{t("consentContinue")}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
