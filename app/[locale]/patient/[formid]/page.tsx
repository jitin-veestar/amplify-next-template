"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { generateClient } from "aws-amplify/api";
import { type Schema } from '@/amplify/data/resource';
import { Amplify, type ResourcesConfig } from "aws-amplify";
import output from '../../../../amplify_outputs.json';

import { useEffect, useMemo, useState } from "react";
import HealthAssessment from "./stepper/HealthAssessment";
import MedicalHistoryDetails from "./stepper/MedicalHistoryDetails";
import TestsMedications from "./stepper/TestsMedications";
import BasicSurgicalDetails from "./stepper/BasicSurgicalDetails";
import {
  basicAndSurgicalSchema,
  medicalHistorySchema,
  testsAndMedicationSchema,
  healthAssessmentSchema,
} from "./utils/schemas";
import { submitForm, useGetFormDetails } from "@/app/services/form-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAppContext } from "@/app/hooks/useAppContext";
import ConsentDialog from "@/app/components/landing-page/ConsentDialog";
import Success from "./component/Success";
import { useTranslations } from "next-intl";
import { isEmpty } from "lodash";

const getCurrentSchema = (currentStep: number) => {
  switch (currentStep) {
    case 0:
      return basicAndSurgicalSchema;
    case 1:
      return medicalHistorySchema;
    case 2:
      return testsAndMedicationSchema;
    case 3:
      return healthAssessmentSchema;
    default:
      return z.object({});
  }
};

Amplify.configure(output);

export default function Form1({
  params,
  searchParams,
}: {
  params: { formid: string };
  searchParams: { message: string };
}) {
  const {
    form1: { form1Step: currentStep, setForm1Step },
  } = useAppContext();

  const [showConcentDialog, setShowConcentDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState<any>(null);
  const t = useTranslations("Index");

  const client = generateClient<Schema>({});

  const onSubmit = () => {
    // if (watchAll?.images?.length < 2 && formDetails.images === true) {
    //   return toast.warn("Please upload at least two images");
    // }
    mutate(watchAll as any);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => submitForm(params.formid, body),
    onSuccess: (data) => {
      toast.success("Form Filled");
      setTimeout(() => {
        setIsSubmitted(true);
      }, 400);
    },
    onError: (error: any) => {
      if (error?.error) {
        return toast.error(error.error);
      }
      toast.error("Something went wrong!");
    },
  });

  const getFormDetails = async () => {
    setLoading(true);
    try {
    const formD = await client.models.IndexForm.get({id: params.formid});
    console.log("asdklflaksjdg", formD.data)
      setFormDetails(formD?.data);
    } catch(err) {
      console.log({err});

    } finally {
      setLoading(false);
    }

  }


  useEffect(() => {
    getFormDetails();
  }, [params.formid])
  

  const handleButtonClick = () => {
    setIsDown(false);
    hookForm.handleSubmit(handleSubmitForm)();
  };

  // const {
  //   isLoading,
  //   data: formDetails,
  //   isError,
  // } = useGetFormDetails({ id: params.formid });

  const getCurrentForm = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return <BasicSurgicalDetails setIsDown={setIsDown} />;
      case 1:
        return <MedicalHistoryDetails setIsDown={setIsDown} />;
      case 2:
        return <TestsMedications setIsDown={setIsDown} />;
      case 3:
        return (
          <HealthAssessment formDetails={formDetails} setIsDown={setIsDown} />
        );
    }
  };

  const currentSchema = useMemo(
    () => getCurrentSchema(currentStep),
    [currentStep]
  );

  const hookForm = useForm({
    resolver: zodResolver(currentSchema),
    reValidateMode: "onChange",
    defaultValues: { patient_information: { gender: "" }, images: [] },
  });

  const watchAll = hookForm.watch();
  console.log({ watchAll });
  console.log({ errors: hookForm.formState.errors });

  const handleNext = () => {
    setForm1Step(currentStep + 1);
  };
  const handleBack = () => {
    setForm1Step(currentStep - 1);
  };
  const handleDialogOpen = () => {
    setShowConcentDialog(true);
  };

  const handleSubmitForm = (data: any) => {
    if (currentStep !== 3) {
      handleNext();
      return;
    } else if (formDetails.consent) {
      if (watchAll?.images?.length < 2 && formDetails.images === true) {
        return toast.warn("Please upload at least two images");
      }
      handleDialogOpen();
      return;
    }
    onSubmit();
  };
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress size={69} />
      </Box>
    );
  }

  if (isEmpty(formDetails) && !isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          <Typography variant="h6">Form Not Found</Typography>
        </Alert>
      </Box>
    );
  }

  if (isSubmitted) {
    return <Success />;
  }

  return (
    <FormProvider {...hookForm}>
      <form onSubmit={hookForm.handleSubmit(onSubmit)}>
        {formDetails?.response && (
          <Alert severity="warning">
            This form has already been submitted.
          </Alert>
        )}
        <Box sx={{ pt: 1 }}>{getCurrentForm(currentStep)}</Box>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            disabled={currentStep === 0}
            onClick={handleBack}
          >
            {t("back")}
          </Button>
          <Button
            size="large"
            type="submit"
            variant={"contained"}
            // onClick={hookForm.handleSubmit(handleSubmitForm)}
            onClick={handleButtonClick}
            disabled={isPending || !isDown}
          >
            {currentStep === 3 ? t("submit") : t("next")}
          </Button>
        </Grid>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isPending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <ConsentDialog
          open={showConcentDialog}
          setOpen={setShowConcentDialog}
          onSubmit={onSubmit}
          setValue={hookForm.setValue}
        />
      </form>
    </FormProvider>
  );
}
