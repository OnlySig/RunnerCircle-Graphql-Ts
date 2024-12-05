import { CssBaseline, TextField, Box, CircularProgress } from "@mui/material";
import { StyledButton } from "./styles";
import styled from "styled-components";
import { useState } from "react";
import { IFormState } from "../../@types/IFormState";
import { useMutation } from "@apollo/client";
import { ADD_ACTIVITY, GET_ACTIVITIES } from "../../graphql/queries/activities";
import { useNavigate } from "react-router-dom";

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledForm = styled.form`
  @media screen and (max-width: 1650px) {
    max-height: 650px;
  }
`;

export function Publicar() {
  const navegar = useNavigate();
  const [formValues, setFormValues] = useState<IFormState>({
    time: "",
    type: "",
    distance: "",
    calories: "",
    bpm: "",
    user: "",
    userImage: "",
    imageUrl: "",
  });

  const resetForm = () => {
    setFormValues({
      time: "",
      type: "",
      distance: "",
      calories: "",
      bpm: "",
      user: "",
      userImage: "",
      imageUrl: "",
    });
  };

  const [addActivity, { loading, error }] = useMutation(ADD_ACTIVITY, {
    variables: formValues,
    refetchQueries: [{ query: GET_ACTIVITIES }],
  });

  const [errors, setErrors] = useState<IFormState>(Object);

  const validateForm = (values: Partial<IFormState>): Partial<IFormState> => {
    const errors: Partial<IFormState> = {};
    for (const key in values) {
      const value = values[key as keyof IFormState]?.trim();
      if (!value?.length) {
        errors[key as keyof IFormState] = `Campo ${key} é obrigatório!`;
      }
    }
    return errors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validate = validateForm(formValues);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validate,
    }));
    if (Object.keys(validate).length) return;
    addActivity();
    navegar("/feed");
    resetForm();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  return (
    <StyledSection>
      <CssBaseline />
      <StyledForm onSubmit={handleSubmit}>
        <h2>Publicar treino</h2>
        {loading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        <StyledDiv>
          <TextField
            label="URL da Imagem da Atividade"
            variant="outlined"
            margin="normal"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleOnChange}
            error={!!errors?.imageUrl}
            helperText={errors?.imageUrl}
            style={{ width: "100%" }}
          />
          <TextField
            label="URL da Imagem do Usuário"
            variant="outlined"
            margin="normal"
            name="userImage"
            value={formValues.userImage}
            onChange={handleOnChange}
            error={!!errors?.userImage}
            helperText={errors?.userImage}
            style={{ width: "100%" }}
          />
        </StyledDiv>
        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          margin="normal"
          name="user"
          value={formValues.user}
          onChange={handleOnChange}
          error={!!errors?.user}
          helperText={errors?.user}
        />
        <TextField
          fullWidth
          label="Distância (km)"
          variant="outlined"
          margin="normal"
          name="distance"
          value={formValues.distance}
          onChange={handleOnChange}
          error={!!errors?.distance}
          helperText={errors?.distance}
        />
        <TextField
          fullWidth
          label="Calorias (kcal)"
          variant="outlined"
          margin="normal"
          name="calories"
          value={formValues.calories}
          onChange={handleOnChange}
          error={!!errors?.calories}
          helperText={errors?.calories}
        />
        <TextField
          fullWidth
          label="Batimentos (BPM)"
          variant="outlined"
          margin="normal"
          name="bpm"
          value={formValues.bpm}
          onChange={handleOnChange}
          error={!!errors?.bpm}
          helperText={errors?.bpm}
        />
        <TextField
          fullWidth
          label="Horário"
          variant="outlined"
          margin="normal"
          name="time"
          value={formValues.time}
          onChange={handleOnChange}
          error={!!errors?.time}
          helperText={errors?.time}
        />
        <TextField
          fullWidth
          label="Tipo de Atividade"
          variant="outlined"
          margin="normal"
          name="type"
          value={formValues.type}
          onChange={handleOnChange}
          error={!!errors?.type}
          helperText={errors?.type}
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledButton type="submit" variant="contained" color="primary">
            Enviar
          </StyledButton>
          <StyledButton
            type="reset"
            variant="outlined"
            color="secondary"
            onClick={resetForm}
          >
            Limpar
          </StyledButton>
        </Box>
      </StyledForm>
    </StyledSection>
  );
}
