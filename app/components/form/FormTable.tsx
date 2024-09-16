import React, { forwardRef, useState, useEffect } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Add, Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import FormCheck from "./FormCheck";
import { parseISO } from "date-fns";
import { useTranslations } from "next-intl";

const CustomInput = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      // label="Birth Date"
      autoComplete="off"
    />
  );
});
CustomInput.displayName = "CustomImput";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.backgroundChannel,
    color: theme.palette.common.black,
    fontWeight: 800,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function TableFormField({ formName, name, columns = [] }: any) {
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const values = watch();
  const t = useTranslations("Index");

  const [rowCount, setRowCount] = useState(0);
  const handleDateChange = (date: Date | null, name: string) => {
    if (date) setValue(name, date.toISOString());
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${formName}.${name}`,
  });
  // useEffect(() => {
  //   if (!fields.length) append({});
  // }, []);

  return (
    <Table sx={{ mt: -2 }}>
      <TableBody>
        {fields.map((row: any, index) => (
          <TableRow key={row.id}>
            <Grid
              container
              spacing={2}
              sx={{
                p: 1,
              }}
            >
              <Grid item xs={12} sm={formName === "medical_history" ? 7 : 10}>
                <TextField
                  {...register(`${formName}.${name}.${index}.value`)}
                  fullWidth
                  id={`${index}`}
                  sx={{ p: 0 }}
                />
              </Grid>
              {formName === "medical_history" && (
                <Grid item xs={10} sm={4}>
                  <FormControl fullWidth>
                    <DatePicker
                      disableFuture
                      value={
                        values?.[formName]?.[name]?.[index]?.date
                          ? parseISO(values?.[formName]?.[name]?.[index]?.date)
                          : null
                      }
                      // {...register(`${formName}.${name}.${index}.date`)}
                      onChange={(date) =>
                        handleDateChange(
                          date,
                          `${formName}.${name}.${index}.date`
                        )
                      }
                    />
                  </FormControl>
                </Grid>
              )}
              <Grid
                item
                xs={1}
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconButton
                  onClick={() => {
                    remove(index);
                    setRowCount(() => rowCount - 1);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
            {values?.[formName]?.[name]?.[index]?.value &&
              name === "surgery_or_proceducre" && (
                <>
                  <Grid
                    container
                    sx={{
                      p: 1,
                      display: { xs: "flex" },
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                        alignItems: "center",
                      },
                    }}
                  >
                    <Grid item sm={4} xs={12} style={{ marginLeft: 20 }}>
                      <FormCheck
                        name={`${formName}.${name}.${index}.metal_in_body`}
                        control={control}
                        // rules={}
                        label={"Is there metal in your body"}
                        // @ts-ignore
                        error={""}
                      />
                    </Grid>
                    {values?.[formName]?.[name]?.[index]?.metal_in_body && (
                      <Grid item sm={4} xs={12}>
                        <TextField
                          label="List where"
                          fullWidth
                          {...register(
                            `${formName}.${name}.${index}.list_of_metal_in_body`
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
          </TableRow>
        ))}
        {rowCount < 8 && (
          <TableRow>
            <StyledTableCell>
              <IconButton
                onClick={() => {
                  append({});
                  setRowCount(() => rowCount + 1);
                }}
              >
                <Add color="primary" />
                <Typography color={"primary"}>
                  {t("medicalHistoryAddRow")}
                </Typography>
              </IconButton>
            </StyledTableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableFormField;
