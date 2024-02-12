import styled , { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secoundary' | 'danger' | 'success'

interface ButtonContainerPros {
    variant: ButtonVariant;
}

const buttonVariants = {
    primary: 'purple',
    secoundary: 'orange',
    danger: 'red',
    success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerPros>`
    width: 100px;
    height: 40px;
    background-color: ${ props => props.theme.secoundary };

    /* ${ props => {
        return css`background-color: ${buttonVariants[props.variant]}`
    }} */
`