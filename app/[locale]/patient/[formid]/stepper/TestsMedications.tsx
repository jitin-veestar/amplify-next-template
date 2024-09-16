import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React, { forwardRef, useEffect, useState } from "react";
import { FormBoxWrapper } from "../CustomFormWrapper";
import Heading from "@/app/components/Heading";
import { useFormContext } from "react-hook-form";
import TableFormField from "@/app/components/form/FormTable";
import { DatePicker } from "@mui/x-date-pickers";
import FormCheck from "@/app/components/form/FormCheck";
import { parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
});
CustomInput.displayName = "CustomImput";

interface TestsMedicationsProps {
  setIsDown: (value: boolean) => void;
}

const TestsMedications: React.FC<TestsMedicationsProps> = ({ setIsDown }) => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const values = watch();
  const t = useTranslations("Index");
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  const handleDateChange = (date: Date | null, name: string) => {
    if (date) setValue(name, date.toISOString());
  };

  const drugsList = [
    {
      label: t("testMedicationDrugInsulin"),
      schema: "insulin",
      fieldPrimary: t("testMedicationDrugDose"),
      fieldPrimarySchema: "insulin_dose",
    },
    {
      label: t("testMedicationDrugMorphine"),
      schema: "morphine",
      fieldPrimary: t("testMedicationDrugDose"),
      fieldPrimarySchema: "morphine_dose",
    },
    {
      label: t("testMedicationDrugOxycodone"),
      schema: "oxycodone",
      fieldPrimary: t("testMedicationDrugDose"),
      fieldPrimarySchema: "oxycodone_dose",
    },
    {
      label: t("testMedicationDrugBuprenorphineMethadone"),
      schema: "buprenorphine_methadone",
      fieldPrimary: t("testMedicationDrugDose"),
      fieldPrimarySchema: "buprenorphine_methadone_dose",
    },
    {
      label: t("testMedicationDrugHIVPrEP"),
      schema: "hiv_prep",
      fieldPrimary: t("testMedicationDrugDose"),
      fieldPrimarySchema: "hiv_prep_dose",
    },
    {
      label: t("testMedicationDrugWeightLoss"),
      schema: "weight_loss_drugs",
    },
    {
      label: t("testMedicationDrugChronicSteroids"),
      schema: "chronic_steroids",
      fieldPrimary: t("testMedicationDrugName"),
      fieldPrimarySchema: "chronic_steroids_drug_name",
      fieldSecondary: t("testMedicationDrugDose"),
      fieldSecondarySchema: "chronic_steroids_dose",
      fieldTertiary: t("testMedicationDrugHowLong"),
      fieldTertiarySchema: "how_long_have_you_been_on_chronic_steroids",
    },
    {
      label: t("testMedicationDrugBloodThinners"),
      schema: "blood_thinners",
      fieldPrimary: t("testMedicationDrugName"),
      fieldPrimarySchema: "blood_thinners_drug_name",
      fieldSecondary: t("testMedicationDrugDose"),
      fieldSecondarySchema: "blood_thinners_dose",
      fieldTertiary: t("testMedicationDrugFrequency"),
      fieldTertiarySchema: "blood_thinners_frequency",
    },
    {
      label: t("testMedicationDrugInhalers"),
      schema: "inhalers",
      fieldPrimary: t("testMedicationDrugName"),
      fieldPrimarySchema: "inhalers_drug_name",
      fieldSecondary: t("testMedicationDrugFrequency"),
      fieldSecondarySchema: "inhalers_frequency",
    },
    {
      label: t("testMedicationDrugLosartan"),
      schema: "losartan",
    },
    {
      label: t("testMedicationDrugLabetalol"),
      schema: "labetalol",
    },
  ];

  useEffect(() => {
    if (inView) {
      setIsDown(true);
    }
  }, [inView]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormBoxWrapper sx={{ height: "75vh", overflowY: "auto" }}>
          <Grid container item spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Heading label={t("testMedicationTitle")} />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
                {t("testMedicationCheckOffTitle")}
              </Typography>

              <Divider sx={{ mt: 4, mb: 4 }} />

              {[
                {
                  title: t("testMedicationEKG"),
                  titleKey: "ekg",
                  labelKey: "location_of_ekg",
                  dateKey: "date_of_ekg",
                },
                {
                  title: t("testMedicationSleepStudy"),
                  titleKey: "sleep_study",
                  labelKey: "location_of_sleep_study",
                  dateKey: "date_of_sleep_study",
                },
                {
                  title: t("testMedicationBloodWork"),
                  titleKey: "blood_work",
                  labelKey: "location_of_blood_work",
                  dateKey: "date_of_blood_work",
                },
                {
                  title: t("testMedicationStressTest"),
                  titleKey: "stress_test",
                  labelKey: "location_of_stress_test",
                  dateKey: "date_of_stress_test",
                },
                {
                  title: t("testMedicationEcho"),
                  titleKey: "echo",
                  labelKey: "location_of_echo",
                  dateKey: "date_of_echo",
                },
                {
                  title: t("testMedicationPulmonaryFunction"),
                  titleKey: "pulmonary_function_test",
                  labelKey: "location_of_pulmonary_function_test",
                  dateKey: "date_of_pulmonary_function_test",
                },
              ].map((item, index) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                  key={index}
                >
                  <Grid container item spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography>{item.title}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label={t("testMedicationLocation")}
                        type="text"
                        fullWidth
                        {...register(
                          `test_and_medication.${item.titleKey}.${item.labelKey}`
                        )}
                        error={
                          !!errors[
                            `test_and_medication.${item.titleKey}.${item.labelKey}`
                          ]
                        }
                        helperText={
                          errors[
                            `test_and_medication.${item.titleKey}.${item.labelKey}`
                          ]?.message as any
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <DatePicker
                          disableFuture
                          value={
                            values?.test_and_medication?.[item.titleKey]?.[
                              item.dateKey
                            ]
                              ? parseISO(
                                  values?.test_and_medication?.[
                                    item.titleKey
                                  ]?.[item.dateKey]
                                )
                              : null
                          }
                          onChange={(date) =>
                            handleDateChange(
                              date,
                              `test_and_medication.${item.titleKey}.${item.dateKey}`
                            )
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: 24, fontWeight: 700, marginTop: 5 }}>
                {t("testMedicationDrugCheckTitle")}
              </Typography>

              <Divider sx={{ mt: 4, mb: 4 }} />

              {drugsList.map((name, index) => (
                <Grid
                  container
                  item
                  xs={12}
                  spacing={2}
                  mb={2}
                  sx={{ alignItems: "center" }}
                  key={index}
                >
                  {name.label && (
                    <Grid item xs={name.fieldSecondary ? 12 : 8}>
                      <FormCheck
                        name={`test_and_medication.${name.schema}.${name.schema}`}
                        control={control}
                        label={`${name.label}`}
                        error={
                          errors?.[
                            `test_and_medication.${name.schema}.${name.schema}`
                          ]
                        }
                      />
                    </Grid>
                  )}
                  {name.fieldPrimary &&
                  values?.test_and_medication?.[name.schema]?.[name.schema] ? (
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label={name.fieldPrimary}
                        type="text"
                        fullWidth
                        {...register(
                          `test_and_medication.${name.schema}.${name.fieldPrimarySchema}`
                        )}
                        error={
                          !!errors[
                            `test_and_medication.${name.schema}.${name.fieldPrimarySchema}`
                          ]
                        }
                        helperText={
                          errors[
                            `test_and_medication.${name.schema}.${name.fieldPrimarySchema}`
                          ]?.message as any
                        }
                      />
                    </Grid>
                  ) : null}
                  {name.fieldSecondary &&
                  values?.test_and_medication?.[name.schema]?.[name.schema] ? (
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label={name.fieldSecondary}
                        type="text"
                        fullWidth
                        {...register(
                          `test_and_medication.${name.schema}.${name.fieldSecondarySchema}`
                        )}
                        error={
                          !!errors[
                            `test_and_medication.${name.schema}.${name.fieldSecondarySchema}`
                          ]
                        }
                        helperText={
                          errors[
                            `test_and_medication.${name.schema}.${name.fieldSecondarySchema}`
                          ]?.message as any
                        }
                      />
                    </Grid>
                  ) : null}
                  {name.fieldTertiary &&
                  values?.test_and_medication?.[name.schema]?.[name.schema] ? (
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label={name.fieldTertiary}
                        type="text"
                        fullWidth
                        {...register(
                          `test_and_medication.${name.schema}.${name.fieldTertiarySchema}`
                        )}
                        error={
                          !!errors[
                            `test_and_medication.${name.schema}.${name.fieldTertiarySchema}`
                          ]
                        }
                        helperText={
                          errors[
                            `test_and_medication.${name.schema}.${name.fieldTertiarySchema}`
                          ]?.message as any
                        }
                      />
                    </Grid>
                  ) : null}
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 700, fontSize: 24, marginTop: 5 }}>
                {t("testMedicationMedicationsListTitle")}
              </Typography>

              <Divider sx={{ mt: 4, mb: 2 }} />

              <TableFormField
                formName="test_and_medication"
                name="medicationsPast"
              />
            </Grid>

            <div ref={inViewRef} />
          </Grid>
        </FormBoxWrapper>
      </Grid>
    </Grid>
  );
};

export default TestsMedications;
