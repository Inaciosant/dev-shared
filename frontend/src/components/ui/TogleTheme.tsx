import styled from "styled-components";

const Switch = styled.label`
  font-size: 13px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2.2em;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CheckboxInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Star = styled.div`
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  width: 5px;
  height: 5px;
  transition: all 0.4s;
  z-index: 1;
`;

const Star1 = styled(Star)`
  left: 0.45em;
  top: 0.45em;
`;

const Star2 = styled(Star)`
  left: 1.15em;
  top: 0.95em;
`;

const Star3 = styled(Star)`
  left: 0.85em;
  top: 1.35em;
`;

const Cloud = styled.svg`
  width: 2.2em;
  position: absolute;
  bottom: -0.45em;
  left: 1.8em;
  opacity: 0;
  transition: all 0.4s;
  z-index: 1;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00a6ff;
  transition: 0.4s;
  border-radius: 30px;
  overflow: hidden;

  &:before {
    position: absolute;
    content: "";
    height: 1.2em;
    width: 1.2em;
    border-radius: 20px;
    left: 0.5em;
    bottom: 0.5em;
    transition: 0.4s;
    transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
    box-shadow: inset 15px -4px 0px 15px #ffcf48;
    z-index: 2;
  }

  ${Star} {
    opacity: 0;
  }

  ${Cloud} {
    opacity: 1;
  }

  ${CheckboxInput}:checked + & {
    background-color: #2a2a2a;
  }

  ${CheckboxInput}:checked + &:before {
    transform: translateX(1.8em);
    box-shadow: inset 8px -4px 0px 0px #fff;
  }

  ${CheckboxInput}:checked ~ & ${Star} {
    opacity: 1;
  }

  ${CheckboxInput}:checked ~ & ${Cloud} {
    opacity: 0;
  }
`;

interface TogleThemeProps {
  checked?: boolean;
  onChange?: ((checked: boolean) => void) | (() => void);
}

const TogleTheme: React.FC<TogleThemeProps> = ({ checked = true, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Suporta tanto funções com parâmetro quanto sem
      if (onChange.length === 0) {
        (onChange as () => void)();
      } else {
        (onChange as (checked: boolean) => void)(e.target.checked);
      }
    }
  };

  return (
    <Switch>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id="theme-checkbox"
      />
      <Slider>
        <Star1 className="star star_1" />
        <Star2 className="star star_2" />
        <Star3 className="star star_3" />
        <Cloud viewBox="0 0 16 16" className="cloud_1 cloud">
          <path
            transform="matrix(.77976 0 0 .78395-299.99-418.63)"
            fill="#fff"
            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
          />
        </Cloud>
      </Slider>
    </Switch>
  );
};

export default TogleTheme;