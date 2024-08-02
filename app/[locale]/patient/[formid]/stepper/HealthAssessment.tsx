import {
  Grid,
  TextField,
  InputAdornment,
  Stack,
  Typography,
  Card,
  Divider,
  FormControl,
} from "@mui/material";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FormBoxWrapper } from "../CustomFormWrapper";
import Heading from "@/app/components/Heading";
import { useFormContext } from "react-hook-form";
import FormCheck from "@/app/components/form/FormCheck";
import { useTranslatedFields } from "../constants/health-assessments";
import UploadImage from "../component/UploadImage";
import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

const CustomInput = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label="Date"
      autoComplete="off"
    />
  );
});
CustomInput.displayName = "CustomImput";

// Main Schema combining all sub-schemas

function HealthAssessmentDetails({ formDetails, setIsDown }: any) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors: globalErrors },
  } = useFormContext();

  const errors: any = useMemo(
    () => globalErrors.health_assesment,
    [globalErrors]
  );

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  const {
    cardiovascularFields,
    respiratoryFields,
    alcoholDrugFields,
    cancerFields,
    bloodDisorderField,
    liverField,
    kidneyField,
    digestiveSystemField,
    backNeckJawField,
    nerveMusclesField,
  } = useTranslatedFields();

  const values = watch();
  const t = useTranslations("Index");
  const handleDateChange = (date: Date | null, name: string) => {
    console.log("date value", name);
    setValue(name, date?.toISOString());
  };
  const handleChangeImage = (name: string, base64: string) => {
    setValue(name, base64 || "");
  };

  useEffect(() => {
    if (inView) {
      setIsDown(true);
    }
  }, [inView]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormBoxWrapper sx={{ height: "75vh", overflowY: "auto" }}>
            <Grid container marginBottom={2}>
              <Grid item xs={12}>
                <Heading label={t("healthAssesmentTitle")} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mt: 2, mb: 2, p: 2 }}>
                <Typography fontWeight={700} fontSize={18}>
                  {t("cardiovascularHealth")}
                </Typography>

                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Grid container spacing={1}>
                  {cardiovascularFields.map((name, index) => {
                    return (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={
                            values?.health_assesment?.cardiovascular_health?.[
                              name.titleSchema
                            ]?.[name.titleSchema] && name.fieldPrimary
                              ? 12
                              : 6
                          }
                          key={index}
                        >
                          {name.title ? (
                            <Stack direction="row" alignItems="center">
                              <FormCheck
                                name={`health_assesment.cardiovascular_health.${name.titleSchema}.${name.titleSchema}`}
                                control={control}
                                label={name.title}
                                error={
                                  errors?.health_assesment
                                    ?.cardiovascular_health?.[
                                    name.titleSchema
                                  ]?.[name.titleSchema]
                                }
                              />
                            </Stack>
                          ) : (
                            <></>
                          )}
                        </Grid>
                        {values?.health_assesment?.cardiovascular_health?.[
                          name.titleSchema
                        ]?.[name.titleSchema] ? (
                          <>
                            {console.log(
                              "strdvuasbgygfuysdguf",
                              values?.health_assesment?.cardiovascular_health?.[
                                name.titleSchema
                              ]?.[name.titleSchema]
                            )}
                            {name.fieldPrimary ? (
                              <Grid
                                item
                                xs={12}
                                sm={
                                  name.fieldSecondary || name.dateSchema
                                    ? name.fieldTertiary
                                      ? 4
                                      : 6
                                    : 8
                                }
                              >
                                <TextField
                                  sx={{
                                    marginRight: 2,
                                  }}
                                  fullWidth
                                  label={name?.fieldPrimary}
                                  type={
                                    name.fieldPrimarySchema === "diabetes_hba1c"
                                      ? "number"
                                      : "text"
                                  }
                                  {...register(
                                    `health_assesment.cardiovascular_health.${name.titleSchema}.${name.fieldPrimarySchema}`
                                  )}
                                  error={
                                    !!errors?.cardiovascular_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldPrimarySchema]
                                  }
                                  helperText={
                                    errors?.cardiovascular_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldPrimarySchema]?.message
                                  }
                                />
                              </Grid>
                            ) : (
                              <></>
                            )}
                            {name?.fieldSecondary ? (
                              <Grid
                                item
                                xs={12}
                                sm={name.fieldTertiary ? 4 : 6}
                              >
                                <TextField
                                  sx={{
                                    marginRight: 2,
                                  }}
                                  fullWidth
                                  label={name?.fieldSecondary}
                                  type="text"
                                  {...register(
                                    `health_assesment.cardiovascular_health.${name.titleSchema}.${name.fieldSecondarySchema}`
                                  )}
                                  error={
                                    !!errors?.cardiovascular_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldSecondarySchema]
                                  }
                                  helperText={
                                    errors?.cardiovascular_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldSecondarySchema]?.message
                                  }
                                />
                              </Grid>
                            ) : (
                              <></>
                            )}
                            {name?.fieldTertiary ? (
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  sx={{
                                    marginRight: 2,
                                  }}
                                  fullWidth
                                  label={name?.fieldTertiary}
                                  type="text"
                                  {...register(
                                    `health_assesment.cardiovascular_health.${name.titleSchema}.${name.fieldTertiarySchema}`
                                  )}
                                  error={
                                    !!errors?.cardiovascular_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldTertiarySchema]
                                  }
                                  helperText={
                                    errors?.cardiovascular_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldTertiarySchema]?.message
                                  }
                                />
                              </Grid>
                            ) : (
                              <></>
                            )}
                            {name?.dateSchema ? (
                              <Grid
                                item
                                xs={12}
                                sm={name.fieldPrimary ? 4 : 8}
                                sx={{ ml: 2 }}
                              >
                                <FormControl>
                                  <DatePicker
                                    disableFuture
                                    value={
                                      values?.health_assesment
                                        ?.cardiovascular_health?.[
                                        name.titleSchema
                                      ]?.[name.dateSchema]
                                        ? parseISO(
                                            values?.health_assesment
                                              ?.cardiovascular_health?.[
                                              name.titleSchema
                                            ]?.[name.dateSchema]
                                          )
                                        : null
                                    }
                                    // id={name.dateSchema}
                                    onChange={(date) =>
                                      handleDateChange(
                                        date,
                                        `health_assesment.cardiovascular_health.${name.titleSchema}.${name.dateSchema}`
                                      )
                                    }
                                  />
                                </FormControl>
                              </Grid>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mt: 2, mb: 2, p: 2 }}>
                <Typography fontWeight={700} fontSize={18}>
                  {t("respiratoryHealth")}
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                <Grid container spacing={1}>
                  {respiratoryFields.map((name, index) => {
                    const selectedQuitSmokingDate =
                      values?.respiratory_health?.ever_smoked
                        ?.quit_smoking_date;

                    return (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={
                            values?.health_assesment?.respiratory_health?.[
                              name.titleSchema
                            ]?.[name.titleSchema] && name.fieldPrimary
                              ? 12
                              : 6
                          }
                          key={index}
                        >
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.respiratory_health.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              // rules={}
                              label={name.title}
                              // @ts-ignore
                              error={
                                errors?.health_assesment?.respiratory_health?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        </Grid>
                        {values?.health_assesment?.respiratory_health?.[
                          name.titleSchema
                        ]?.[name.titleSchema] ? (
                          <>
                            {console.log(
                              "strdvuasbgygfuysdguf",
                              values?.health_assesment?.respiratory_health?.[
                                name.titleSchema
                              ]?.[name.titleSchema]
                            )}
                            {name.fieldPrimary ? (
                              <Grid item xs={12} sm={name.dateSchema ? 6 : 8}>
                                <TextField
                                  sx={{
                                    marginRight: 2,
                                  }}
                                  fullWidth
                                  label={name?.fieldPrimary}
                                  type={
                                    name.titleSchema === "sleep_apnea" ||
                                    name.titleSchema ===
                                      "high_blood_pressure_treatment" ||
                                    name.titleSchema === "smoke" ||
                                    name.titleSchema === "ever_smoked"
                                      ? "number"
                                      : "text"
                                  }
                                  {...register(
                                    `health_assesment.respiratory_health.${name.titleSchema}.${name.fieldPrimarySchema}`
                                  )}
                                  error={
                                    !!errors?.respiratory_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldPrimarySchema]
                                  }
                                  helperText={
                                    errors?.respiratory_health?.[
                                      name.titleSchema
                                    ]?.[name.fieldPrimarySchema]?.message
                                  }
                                />
                              </Grid>
                            ) : (
                              <></>
                            )}
                            {name?.dateSchema ? (
                              <Grid
                                item
                                xs={12}
                                sm={name.fieldPrimary ? 4 : 8}
                                sx={{ ml: 2 }}
                              >
                                <FormControl>
                                  <DatePicker
                                    disableFuture
                                    value={
                                      values?.health_assesment
                                        ?.respiratory_health?.[
                                        name.titleSchema
                                      ]?.[name.dateSchema]
                                        ? parseISO(
                                            values?.health_assesment
                                              ?.respiratory_health?.[
                                              name.titleSchema
                                            ]?.[name.dateSchema]
                                          )
                                        : null
                                    }
                                    // showYearDropdown
                                    // showMonthDropdown
                                    // placeholderText="MM-DD-YYYY"
                                    // customInput={<CustomInput />}
                                    // id={name.dateSchema}
                                    onChange={(date) =>
                                      handleDateChange(
                                        date,
                                        `health_assesment.respiratory_health.${name.titleSchema}.${name.dateSchema}`
                                      )
                                    }
                                  />
                                </FormControl>
                              </Grid>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mt: 2, mb: 2, p: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                  {t("alcoholDrug")}
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Grid container spacing={1}>
                  {alcoholDrugFields.map((name, index) => (
                    <>
                      <Grid
                        item
                        key={index}
                        xs={12}
                        sm={12}
                        md={
                          values?.health_assesment?.alcohol_drug_use?.[
                            name.titleSchema
                          ]?.[name.titleSchema] && name.fieldPrimary
                            ? 12
                            : 6
                        }
                      >
                        {name?.title ? (
                          <>
                            <Stack direction="row" alignItems="center">
                              <FormCheck
                                name={`health_assesment.alcohol_drug_use.${name.titleSchema}.${name.titleSchema}`}
                                control={control}
                                // rules={}
                                label={name.title}
                                // @ts-ignore
                                error={
                                  errors?.health_assesment?.alcohol_drug_use?.[
                                    name.titleSchema
                                  ]?.[name.titleSchema]
                                }
                              />
                            </Stack>
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      {name?.fieldPrimary &&
                      values?.health_assesment?.alcohol_drug_use?.[
                        name.titleSchema
                      ]?.[name.titleSchema] ? (
                        <>
                          <Grid
                            item
                            xs={12}
                            sm={
                              name.fieldSecondary
                                ? name.fieldTertiary
                                  ? 4
                                  : 6
                                : 8
                            }
                          >
                            <TextField
                              sx={{
                                marginRight: 2,
                              }}
                              fullWidth
                              label={name?.fieldPrimary}
                              type={
                                // name.fieldPrimarySchema === "days_per_week" ||
                                // name.fieldPrimarySchema === "quantity_alcohol"
                                //   ? "number"
                                //   :
                                "text"
                              }
                              {...register(
                                `health_assesment.alcohol_drug_use.${name.titleSchema}.${name.fieldPrimarySchema}`
                              )}
                              error={
                                !!errors?.respiratory_health?.[
                                  name.titleSchema
                                ]?.[name.fieldPrimarySchema]
                              }
                              helperText={
                                errors?.respiratory_health?.[
                                  name.titleSchema
                                ]?.[name.fieldPrimarySchema]?.message
                              }
                            />
                          </Grid>
                          {name?.fieldSecondary ? (
                            <Grid item xs={12} sm={name.fieldTertiary ? 4 : 6}>
                              <TextField
                                sx={{
                                  marginRight: 2,
                                }}
                                fullWidth
                                label={name?.fieldSecondary}
                                type="text"
                                {...register(
                                  `health_assesment.alcohol_drug_use.${name.titleSchema}.${name.fieldSecondarySchema}`
                                )}
                                error={
                                  !!errors?.respiratory_health?.[
                                    name.titleSchema
                                  ]?.[name.fieldSecondarySchema]
                                }
                                helperText={
                                  errors?.respiratory_health?.[
                                    name.titleSchema
                                  ]?.[name.fieldSecondarySchema]?.message
                                }
                              />
                            </Grid>
                          ) : (
                            <></>
                          )}

                          {name?.fieldTertiary ? (
                            <Grid item xs={12} sm={4}>
                              <TextField
                                sx={{
                                  marginRight: 2,
                                }}
                                fullWidth
                                label={name?.fieldTertiary}
                                type={
                                  // name.fieldTertiarySchema ===
                                  //   "days_per_week" ||
                                  // name.fieldTertiarySchema ===
                                  //   "quantity_alcohol"
                                  //   ? "number"
                                  //   :
                                  "text"
                                }
                                {...register(
                                  `health_assesment.alcohol_drug_use.${name.titleSchema}.${name.fieldTertiarySchema}`
                                )}
                                error={
                                  !!errors?.respiratory_health?.[
                                    name.titleSchema
                                  ]?.[name.fieldTertiarySchema]
                                }
                                helperText={
                                  errors?.respiratory_health?.[
                                    name.titleSchema
                                  ]?.[name.fieldTertiarySchema]?.message
                                }
                              />
                            </Grid>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </Grid>
              </Card>

              <Grid item xs={12}>
                <Card
                  sx={{
                    border: "1px solid #dfdfdf",
                    borderRadius: "6px",
                    padding: "20px",
                  }}
                >
                  <Grid container spacing={1}>
                    {cancerFields.map((name, index) => (
                      <>
                        <Grid
                          item
                          key={index}
                          xs={12}
                          sm={12}
                          md={
                            values?.health_assesment?.cancer?.[
                              name.titleSchema
                            ]?.[name.titleSchema]
                              ? 12
                              : 6
                          }
                        >
                          {name?.title ? (
                            <>
                              <Stack direction="row" alignItems="center">
                                <FormCheck
                                  name={`health_assesment.cancer.${name.titleSchema}.${name.titleSchema}`}
                                  control={control}
                                  // rules={}
                                  label={name.title}
                                  // @ts-ignore
                                  error={
                                    errors?.health_assesment?.cancer?.[
                                      name.titleSchema
                                    ]?.[name.titleSchema]
                                  }
                                />
                              </Stack>
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                        {name?.fieldPrimary &&
                        values?.health_assesment?.cancer?.[name.titleSchema]?.[
                          name.titleSchema
                        ] ? (
                          <>
                            <Grid item xs={12} sm={8}>
                              <TextField
                                sx={{
                                  marginRight: 2,
                                }}
                                fullWidth
                                label={name?.fieldPrimary}
                                type="text"
                                {...register(
                                  `health_assesment.cancer.${name.titleSchema}.${name.fieldPrimarySchema}`
                                )}
                                error={
                                  !!errors?.respiratory_health?.[
                                    name.titleSchema
                                  ]?.[name.fieldPrimarySchema]
                                }
                                helperText={
                                  errors?.respiratory_health?.[
                                    name.titleSchema
                                  ]?.[name.fieldPrimarySchema]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ mt: 2, mb: 2, p: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700} fontSize={18}>
                    {t("bloodDisorders")}
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                </Grid>

                {bloodDisorderField.map((name, index) => (
                  <>
                    <Grid item key={index} xs={12} sm={12} md={6}>
                      {name?.title ? (
                        <>
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.blood_disorder.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              // rules={}
                              label={name.title}
                              // @ts-ignore
                              error={
                                errors?.health_assesment?.blood_disorder?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </>
                ))}

                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600, fontSize: 18, mt: 4 }}>
                    {t("liver")}
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                </Grid>
                {liverField.map((name, index) => (
                  <>
                    <Grid item key={index} xs={12} sm={12} md={6}>
                      {name?.title ? (
                        <>
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.liver.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              // rules={}
                              label={name.title}
                              // @ts-ignore
                              error={
                                errors?.health_assesment?.liver?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </>
                ))}

                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, mt: 4 }}>
                    {t("kidneys")}
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                </Grid>

                {kidneyField.map((name, index) => {
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={
                          values?.health_assesment?.kidney?.[
                            name.titleSchema
                          ]?.[name.titleSchema] && name.fieldPrimary
                            ? 12
                            : 6
                        }
                        key={index}
                      >
                        {name.title ? (
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.kidney.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              label={name.title}
                              error={
                                errors?.health_assesment?.kidney?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      {values?.health_assesment?.kidney?.[name.titleSchema]?.[
                        name.titleSchema
                      ] ? (
                        <>
                          {name.fieldPrimary ? (
                            <Grid
                              item
                              xs={12}
                              sm={name.fieldSecondary ? 6 : 8}
                              style={{ marginLeft: 20 }}
                            >
                              <FormCheck
                                name={`health_assesment.kidney.${name.titleSchema}.${name.fieldPrimarySchema}`}
                                control={control}
                                label={name?.fieldPrimary}
                                error={
                                  errors?.kidney?.[name.titleSchema]?.[
                                    name.fieldPrimarySchema
                                  ]
                                }
                              />
                            </Grid>
                          ) : (
                            <></>
                          )}
                          {name?.fieldSecondary &&
                          values?.health_assesment?.kidney?.[
                            name.titleSchema
                          ]?.[name.fieldPrimarySchema] ? (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              style={{ marginLeft: 30 }}
                            >
                              <TextField
                                sx={{
                                  marginRight: 2,
                                }}
                                fullWidth
                                label={name?.fieldSecondary}
                                type="text"
                                {...register(
                                  `health_assesment.kidney.${name.titleSchema}.${name.fieldSecondarySchema}`
                                )}
                                error={
                                  !!errors?.kidney?.[name.titleSchema]?.[
                                    name.fieldSecondarySchema
                                  ]
                                }
                                helperText={
                                  errors?.kidney?.[name.titleSchema]?.[
                                    name.fieldSecondarySchema
                                  ]?.message
                                }
                              />
                            </Grid>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}

                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, mt: 4 }}>
                    {t("digestiveSystem")}
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                </Grid>
                {digestiveSystemField.map((name, index) => {
                  return (
                    <>
                      <Grid item xs={12} sm={12} md={6} key={index}>
                        {name.title ? (
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.digestive_system.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              label={name.title}
                              error={
                                errors?.health_assesment?.digestive_system?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </>
                  );
                })}

                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, mt: 4 }}>
                    {t("neurological")}
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                </Grid>

                {nerveMusclesField.map((name, index) => {
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={
                          values?.health_assesment?.nerves_muscles?.[
                            name.titleSchema
                          ]?.[name.titleSchema] && name.fieldPrimary
                            ? 12
                            : 6
                        }
                        key={index}
                      >
                        {name.title ? (
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.nerves_muscles.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              label={name.title}
                              error={
                                errors?.health_assesment?.nerves_muscles?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      {values?.health_assesment?.nerves_muscles?.[
                        name.titleSchema
                      ]?.[name.titleSchema] ? (
                        <>
                          {console.log(
                            "strdvuasbgygfuysdguf",
                            values?.health_assesment?.nerves_muscles?.[
                              name.titleSchema
                            ]?.[name.titleSchema]
                          )}
                          {name.fieldPrimary ? (
                            <Grid item xs={12} sm={name.dateSchema ? 6 : 8}>
                              <TextField
                                sx={{
                                  marginRight: 2,
                                }}
                                fullWidth
                                label={name?.fieldPrimary}
                                type="text"
                                {...register(
                                  `health_assesment.nerves_muscles.${name.titleSchema}.${name.fieldPrimarySchema}`
                                )}
                                error={
                                  !!errors?.nerves_muscles?.[
                                    name.titleSchema
                                  ]?.[name.fieldPrimarySchema]
                                }
                                helperText={
                                  errors?.nerves_muscles?.[name.titleSchema]?.[
                                    name.fieldPrimarySchema
                                  ]?.message
                                }
                              />
                            </Grid>
                          ) : (
                            <></>
                          )}
                          {name?.dateSchema ? (
                            <Grid
                              item
                              xs={12}
                              sm={name.fieldPrimary ? 4 : 8}
                              sx={{ ml: 2 }}
                            >
                              <FormControl>
                                <DatePicker
                                  disableFuture
                                  value={
                                    values?.health_assesment?.nerves_muscles?.[
                                      name.titleSchema
                                    ]?.[name.dateSchema]
                                      ? parseISO(
                                          values?.health_assesment
                                            ?.nerves_muscles?.[
                                            name.titleSchema
                                          ]?.[name.dateSchema]
                                        )
                                      : null
                                  }
                                  // showYearDropdown
                                  // showMonthDropdown
                                  // placeholderText="MM-DD-YYYY"
                                  // customInput={<CustomInput />}
                                  // id={name.dateSchema}
                                  onChange={(date) =>
                                    handleDateChange(
                                      date,
                                      `health_assesment.nerves_muscles.${name.titleSchema}.${name.dateSchema}`
                                    )
                                  }
                                />
                              </FormControl>
                            </Grid>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}

                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 700, fontSize: 18, mt: 4 }}>
                    {t("other")}
                  </Typography>
                  <Divider sx={{ marginTop: 1 }} />
                </Grid>

                {backNeckJawField.map((name, index) => {
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={
                          values?.health_assesment?.back_neck_jaw?.[
                            name.titleSchema
                          ]?.[name.titleSchema] && name.fieldPrimary
                            ? 12
                            : 6
                        }
                        key={index}
                      >
                        {name.title ? (
                          <Stack direction="row" alignItems="center">
                            <FormCheck
                              name={`health_assesment.back_neck_jaw.${name.titleSchema}.${name.titleSchema}`}
                              control={control}
                              label={name.title}
                              error={
                                errors?.health_assesment?.back_neck_jaw?.[
                                  name.titleSchema
                                ]?.[name.titleSchema]
                              }
                            />
                          </Stack>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      {values?.health_assesment?.back_neck_jaw?.[
                        name.titleSchema
                      ]?.[name.titleSchema] ? (
                        <>
                          {console.log(
                            "strdvuasbgygfuysdguf",
                            values?.health_assesment?.back_neck_jaw?.[
                              name.titleSchema
                            ]?.[name.titleSchema]
                          )}
                          {name.fieldPrimary ? (
                            <Grid item xs={12} sm={9}>
                              <TextField
                                sx={{
                                  marginRight: 2,
                                }}
                                fullWidth
                                label={name?.fieldPrimary}
                                type="text"
                                {...register(
                                  `health_assesment.back_neck_jaw.${name.titleSchema}.${name.fieldPrimarySchema}`
                                )}
                                error={
                                  !!errors?.back_neck_jaw?.[name.titleSchema]?.[
                                    name.fieldPrimarySchema
                                  ]
                                }
                                helperText={
                                  errors?.back_neck_jaw?.[name.titleSchema]?.[
                                    name.fieldPrimarySchema
                                  ]?.message
                                }
                              />
                            </Grid>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    label={t("additionalMedicalIllnesses")}
                    placeholder={t("additionalMedicalIllnesses")}
                    sx={{
                      "& .MuiOutlinedInput-root": { alignItems: "baseline" },
                    }}
                    {...register(
                      "health_assesment.additional_medical_illnesses"
                    )}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormCheck
                    name={"health_assesment.health_detail_have_any_questions"}
                    control={control}
                    // rules={}
                    label={t("commentsQuestions")}
                    // @ts-ignore
                    error={
                      errors?.health_assesment?.health_detail_have_any_questions
                    }
                  />
                </Grid>
                <div ref={inViewRef} />

                <Grid item xs={12} sx={{ mt: 2 }}>
                  {values?.health_assesment
                    ?.health_detail_have_any_questions ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label={t("questionComment")}
                      placeholder={t("questionComment")}
                      {...register(
                        `health_assesment.${"health_detail_write_any_questions"}`
                      )}
                      sx={{
                        "& .MuiOutlinedInput-root": { alignItems: "baseline" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
                {formDetails?.images && (
                  <Grid
                    item
                    display={{ xs: "flex" }}
                    flexDirection={{ xs: "column" }}
                    spacing={{ xs: 2, md: 0 }}
                  >
                    <h1>{t("uploadImage")}</h1>
                    <Stack
                      display={{ xs: "flex" }}
                      flexDirection={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 2, md: 0 }}
                    >
                      <UploadImage
                        type={t("teeth")}
                        onChange={(base64) =>
                          handleChangeImage("images[0]", base64)
                        }
                        placeholderImg="teeth"
                      />
                      <UploadImage
                        type={t("face")}
                        onChange={(base64) =>
                          handleChangeImage("images[1]", base64)
                        }
                        placeholderImg="face"
                      />
                      <UploadImage
                        type={t("throat")}
                        onChange={(base64) =>
                          handleChangeImage("images[2]", base64)
                        }
                        placeholderImg="throat"
                      />
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Card>
          </FormBoxWrapper>
        </Grid>
      </Grid>
    </>
  );
}

export default HealthAssessmentDetails;
