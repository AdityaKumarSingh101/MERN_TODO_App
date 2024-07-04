type SubmitButtonProps = {
  type: string;
};

type HomePageButtonProps = {
  type: string;
  onClick: () => void;
};

type DashboardButtonProps = {
  type: string;
  onClick: () => void;
};

// Button Styles
const SubmitButtonStyle =
  "h-12 border-black border-2 text-black font-mono font-normal text-lg hover:bg-black hover:text-white mt-5";

const HomePageButtonStyle =
  "w-[20vw] h-[10vh] border-white border-2 bg-transparent text-white font-mono text-xl hover:bg-white hover:text-black hover:cursor-pointer";

const LogoutButtonStyle =
  "w-20 h-10 border-white border-2 text-white font-serif font-normal text-md mr-10 hover:bg-white hover:text-black";

export const SubmitButton = ({ type }: SubmitButtonProps) => {
  switch (type) {
    case "SignUp":
      return (
        <>
          <button type="submit" className={SubmitButtonStyle}>
            Sign Up!
          </button>
        </>
      );
    case "Login":
      return (
        <>
          <button type="submit" className={SubmitButtonStyle}>
            Login
          </button>
        </>
      );
  }
};

export const HomePageButton = ({ type, onClick }: HomePageButtonProps) => {
  switch (type) {
    case "SignUp":
      return (
        <>
          <button
            type="button"
            className={HomePageButtonStyle}
            onClick={onClick}
          >
            Sign Up!
          </button>
        </>
      );
    case "Login":
      return (
        <>
          <button
            type="button"
            className={HomePageButtonStyle}
            onClick={onClick}
          >
            Login
          </button>
        </>
      );
  }
};

export const DashboardButton = ({ type, onClick }: DashboardButtonProps) => {
  switch (type) {
    case "Logout":
      return (
        <button className={LogoutButtonStyle} onClick={onClick}>
          Logout
        </button>
      );

    case "AddTodoToggle":
      return (
        <button
          className="w-[100%] border-black border-2 bg-black text-white py-1"
          onClick={onClick}
        >
          Add Todo
        </button>
      );
  }
};
