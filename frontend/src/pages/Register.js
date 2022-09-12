import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../style/Spinner'
import { register, reset } from '../feautures/auth/authSlice'
import styled from 'styled-components'

const RegisterStyle = styled.div`
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

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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
      navigate('/login')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('비밀번호가 일치하지 않습니다.')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <RegisterStyle>
      <section className='heading'>
        <h1>
          <FaUser /> 회원가입
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='이름'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='이메일'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='비밀번호'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              placeholder='비밀번호 확인'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </RegisterStyle>
  )
}

export default Register
