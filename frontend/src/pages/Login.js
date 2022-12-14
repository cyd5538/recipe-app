import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../feautures/auth/authSlice'
import Spinner from '../style/Spinner'
import styled from 'styled-components'

const LoginStyled = styled.div`
 max-width: 1000px;
  width: 100%;
  margin: auto;

  .heading{
    margin-top: 50px;
    text-align: center;
    color: blueviolet;
  }

  .form{
    margin-top: 50px;
    form{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
    }
  }
  input{
    padding-left: 10px;
    border: 1px solid blueviolet;

  }

  input, .btn{
    height: 40px;
    width: 300px;
    font-size: 1rem;
  }
  .btn{
    background-color: blueviolet;
    border: none;
    color:white;
    cursor: pointer;
  }
`

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <LoginStyled>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='?????????'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='????????????'
              onChange={onChange}
            />
          </div>

          <div>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </LoginStyled>
  )
}

export default Login
