import { useState } from "react";
import {
	makeStyles,
  } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const useStyles = makeStyles((theme) => ({ 	
    container: {
        display:'flex',
        justifyContent:'center',
        
        width: "100%",
        paddingLeft: "6px",
        paddingRight: "6px",
        [theme.breakpoints.down("sm")]: {
          paddingLeft: 5,
          paddingRight: 5,
        },
      },
      root: {
        display: "flex",
        width:'80%',
        border: "1px solid rgba(0, 0, 0, .2)",
        justifyContent:'space-around',
        flexWrap: "nowrap",
        background: "white",
        borderRadius: "15px",
        height: "550px",
        padding: 10,
        "& a": {
          color: "#3A6351",
        },
    
        [theme.breakpoints.down("sm")]: {
          "& form": {
            padding: 0,
          },
        },
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        marginLeft:'158px',
        width: "90%",
        marginTop:'40px',
        [theme.breakpoints.down("sm")]: {
          /*width:'80%'*/
        },
        "@media (max-width:960px)": {
          marginLeft:'105px',
          marginTop:'10px'
        },
      },
  submit: {
    background: "#3293A8",
    borderRadius: "5px",
    width: "70%",
    height: "50px",
    
    margin: theme.spacing(1, 0, 2),
    "&:hover": {
      background: "rgba(50, 147, 168,0.79)",
    },
    "@media (max-width:760px)": {
      width:"80%"
    },
  },

  login:{
    fontWeight:'800',
    marginLeft:'65px',
    "@media (max-width:760px)": {
        
        marginLeft:'15px'
      },

  },
  textField: {
    margin: "10px 0",
    borderRadius: "10px",
    width: "70%",

   
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: "0px solid #eee",
    borderLeftWidth: "7px",
    borderLeftColor: "rgba(215,215,215,0.47)",
    "& input": {
      color: "rgba(57,50,50,0.25)",
      border: "0px solid #eee",
      height:'25px',
      borderRadius: "10px",
      width: "100%",
    },
    "@media (max-width:760px)": {
      width: "80%",
    },
  },
  texts:
  {marginLeft:'-210px',
  "@media (max-width:760px)": {
    marginLeft:'-105px',
  }},
  inputAdornment: {
    background: "rgba(215,215,215,0.87)",
    borderRadius: "7px 0px 0px 7px",
  },
  imgHolder: {
  
    backgroundColor: "rgba(215,215,215,0.1)",
    marginLeft:'25px',
    borderRadius: "15px",
    marginBottom: "auto",
    display: "flex",
    width:"70%",
    marginTop:'auto',
    height: "auto",
    paddingBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    width:'40%',
  },
}));



const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.right}>
					
					
				</div>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>

						<div className={styles.otheroption}>
							<p>Don't you have an Account</p>
							<Link to="/signup">
						<a style={{paddingInline:'15px', color:'black', fontWeight:'bold'}}>
							Sign  Up
						</a>
					</Link>
						</div>
						
					</form>
				</div>
				
			</div>
		</div>
	);
};

export default Login;
