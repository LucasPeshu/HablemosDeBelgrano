import { connect } from "react-redux";
import LayoutDashboard from "hocs/layout/LayoutDashboard";
import { get_author_news_list, get_author_news_list_page, get_auth_news } from "redux/actions/news/news"
import { get_categories } from "redux/actions/categories/categories"
import { useEffect, useState, Fragment  } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from "axios"
import DOMPurify from 'dompurify'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Dialog, Transition } from '@headlessui/react'


function EditPost({
  post,
  get_auth_news,
  isAuthenticated,
  get_categories,
  categories
}){
  
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const params = useParams()
  const slug = params.slug

  useEffect(()=>{
      window.scrollTo(0,0)
      get_auth_news(slug)
      categories ? <></>: get_categories()
  },[slug])

  const [updateTitle, setUpdateTitle]=useState(false)
  const [updateSlug, setUpdateSlug]=useState(false)
  const [updateDescription, setUpdateDescription]=useState(false)
  const [updateContent, setUpdateContent]=useState(false)
  const [updateCategory, setUpdateCategory]=useState(false)
  const [updateThumbnail, setUpdateThumbnail]=useState(false)
  const [updateTime, setUpdateTime]=useState(false)
  const [content, setContent]=useState('')

  const [formData, setFormData]=useState({
      title:'',
      new_slug:'',
      description:'',
      category:'',
      time_read:'',
  })

  const {
      title,
      new_slug,
      description,
      category,
      time_read,
  } = formData

  const onChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  const [thumbnail, setThumbnail] = useState(null)

  const navigate = useNavigate()

  const fileSelectedHandler = (e)=> {
      const file = e.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
          setPreviewImage(reader.result);
      };
      setThumbnail(file)
  }

  const resetStates=()=>{
      setUpdateTitle(false)
      setUpdateSlug(false)
      setUpdateDescription(false)
      setUpdateContent(false)
      setUpdateCategory(false)
      setUpdateThumbnail(false)
      setUpdateTime(false)
  }


  const onSubmit = e =>{
      e.preventDefault()
      
      const config = {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'Authorization': `JWT ${localStorage.getItem('access')}`
          }
      };

      const formData = new FormData()
      formData.append('title', title)
      formData.append('slug', slug)
      formData.append('new_slug', new_slug)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('time_read', time_read)

      if(thumbnail){

          formData.append('thumbnail', thumbnail, thumbnail.name)
      }else{
          formData.append('thumbnail', '')

      }

      if(content){
          formData.append('content', content)
      }else{
          formData.append('content', '')
      }

      const fetchData = async()=>{
          setLoading(true)
          try{
              const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/news/edit`,
              formData,
              config)

              if(res.status === 200){

                  if(new_slug!==''){
                      await get_auth_news(new_slug)
                      navigate(-1)
                  }else{
                      await get_auth_news(slug)
                  }

                  setFormData({ 
                      title:'',
                      new_slug:'',
                      description:'',
                      content:'',
                      time_read:''
                  })

                  setLoading(false)

                  resetStates()

                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }else{
                  setLoading(false)
                  resetStates()
                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }
          }catch(err){
              setLoading(false)
              resetStates()
              if(thumbnail){
                  setThumbnail(null)
                  setPreviewImage(null)
              }
              if(content){
                  setContent('')
              }
              alert('Error al enviar')
          }
      }
      fetchData()
  }

  const onSubmitDraft = e =>{
      e.preventDefault()
      
      const config = {
          headers: {
              'Accept': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
          }
      };

      const formData = new FormData()
      formData.append('slug', slug)

      const fetchData = async()=>{
          setLoading(true)
          try{
              const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/news/draft`,
              formData,
              config)

              if(res.status === 200){
                  setOpen(false)
                  if(new_slug!==''){
                      await get_auth_news(new_slug)
                      navigate(-1)
                  }else{
                      await get_auth_news(slug)
                  }

                  setFormData({ 
                      title:'',
                      new_slug:'',
                      description:'',
                      content:'',
                  })

                  setLoading(false)
                  resetStates()
                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }else{
                  setOpen(false)
                  setLoading(false)
                  resetStates()
                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }
          }catch(err){
              setOpen(false)
              setLoading(false)
              resetStates()
              if(thumbnail){
                  setThumbnail(null)
                  setPreviewImage(null)
              }
              if(content){
                  setContent('')
              }
              alert('Error al enviar')
          }
      }
      fetchData()
  }

  const onSubmitPublish = e =>{
      e.preventDefault()
      
      const config = {
          headers: {
              'Accept': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
          }
      };

      const formData = new FormData()
      formData.append('slug', slug)

      const fetchData = async()=>{
          setLoading(true)
          try{
              const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/news/publish`,
              formData,
              config)

              if(res.status === 200){
                  setOpen(false)
                  if(new_slug!==''){
                      await get_auth_news(new_slug)
                      navigate(-1)
                  }else{
                      await get_auth_news(slug)
                  }

                  setFormData({ 
                      title:'',
                      new_slug:'',
                      description:'',
                      content:'',
                  })

                  setLoading(false)
                  resetStates()
                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }else{
                  setOpen(false)
                  setLoading(false)
                  resetStates()
                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }
          }catch(err){
              setOpen(false)
              setLoading(false)
              resetStates()
              if(thumbnail){
                  setThumbnail(null)
                  setPreviewImage(null)
              }
              if(content){
                  setContent('')
              }
              alert('Error al enviar')
          }
      }
      fetchData()
  }

  const onSubmitDelete = e =>{
      e.preventDefault()
      
      const config = {
          headers: {
              'Accept': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
          }
      };

      const formData = new FormData()
      formData.append('slug', slug)

      const fetchData = async()=>{
          setLoading(true)
          try{
              const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/news/delete/${slug}`,
              formData,
              config)

              if(res.status === 200){
                  navigate(-1)
              }else{
                  setOpen(false)
                  setLoading(false)
                  resetStates()
                  if(thumbnail){
                      setThumbnail(null)
                      setPreviewImage(null)
                  }
                  if(content){
                      setContent('')
                  }
              }
          }catch(err){
              setOpen(false)
              setLoading(false)
              resetStates()
              if(thumbnail){
                  setThumbnail(null)
                  setPreviewImage(null)
              }
              if(content){
                  setContent('')
              }
              alert('Error al enviar')
          }
      }
      fetchData()
  } 

  return (
    <LayoutDashboard>
      <div className="p-4 w-screen">
        {
          post && isAuthenticated ?
          <>
            <div className="">
              <div className="">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">                      <h3 className="text-3xl font-medium leading-6 text-gray-900">Editar:</h3>
                    <p className="mt-3 text-lg text-gray-500">
                      {post.news.title}
                    </p>
                </div>

                <div className="flex gap-2">
                <a
                        href={`${process.env.REACT_APP_API_URL}noticia/${post.news.slug}`}
                        target="_blank"
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Ver noticia
                    </a>
                    <button
                        onClick={e=>setOpen(true)}
                        className="relative inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
                    >
                        {
                            post.news.get_status==='published'?
                            <>Draftear</>:<>Publicar</>
                        }
                    </button>
                  <button
                    onClick={e=>setOpenDelete(true)}
                    className="relative inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 ">
                    Eliminar
                  </button>
                </div>
              </div>
              </div>

      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Título</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {
                updateTitle ?
                <>
                  <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow w-full">
                      <input 
                        value={title}
                        onChange={e=>onChange(e)}
                        name='title'
                        type='text'
                        className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese un título"
                        required
                      />
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateTitle(false)}
                        className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </>
                :
                <>
                <div className="w-screen flex justify-between gap-2">
                <p>{post.news.title}</p>
              <button
                onClick={() => setUpdateTitle(true)}
                type="button"
                className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
              >
                Editar
              </button>
              </div>
              </>
              }
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Slug</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {
                updateSlug ?
                <>
                  <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow w-full">
                      <input 
                        value={new_slug}
                        onChange={e=>onChange(e)}
                        name='new_slug'
                        type='text'
                        className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese un slug"
                        required
                      />
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateSlug(false)}
                        className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </>
                :
                <>
                <div className="w-screen flex justify-between gap-2">
                <p>{post.news.slug}</p>
              <button
                onClick={() => setUpdateSlug(true)}
                type="button"
                className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
              >
                Editar
              </button>
              </div>
              </>
              }
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Thumbnail</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {
                            updateThumbnail ?
                            <>
                            {
                                previewImage&&
                                <img src={previewImage} className='object-cover w-80 h-72 p-4'/>
                            }

                            <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <span className="flex-grow">
                                    <input
                                    type='file'
                                    name='thumbnail'
                                    onChange={e=>fileSelectedHandler(e)}
                                    className="block w-full text-sm text-gray-500 bg-gray-300 p-2 rounded-md
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-lg file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100
                                      cursor-pointer focus:outline-none"
                                    required
                                    />
                                </span>
                                <span className="flex-shrink-0 flex space-x-2">
                                    <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                    Guardar
                                    </button>
                                    <div
                                    onClick={()=>{
                                        setUpdateThumbnail(false)
                                        setThumbnail(null)
                                        setPreviewImage(null)
                                    }}
                                    className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                    Cancelar
                                    </div>
                                </span>
                            </form>
                            </>
                            :
                            <>
                                <span className="flex-grow text-lg">
                                    {
                                        post.news.thumbnail &&
                                    <img src={'https://res.cloudinary.com/diadzh30o/' + post.news.thumbnail} className='object-cover w-full h-72'/>
                                    }
                                    </span>
                                <span className="ml-4 flex-shrink-0">
                                    <div
                                    onClick={()=>setUpdateThumbnail(true)}
                                    className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
                                    >
                                    Editar
                                    </div>
                                </span>
                            </>
                        }
                    </dd>
                </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Descripción</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {
                updateDescription ?
                <>
                  <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow w-full">
                      <input 
                        value={description}
                        onChange={e=>onChange(e)}
                        name='description'
                        type='text'
                        className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese una descripción"
                        required
                      />
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateDescription(false)}
                        className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </>
                :
                <>
                <div className="w-screen flex justify-between gap-2">
                <p>{post.news.description}</p>
              <button
                onClick={() => setUpdateDescription(true)}
                type="button"
                className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
              >
                Editar
              </button>
              </div>
              </>
              }
            </dd>
          </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Tiempo de lectura</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {
                updateTime ?
                <>
                  <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow w-full">
                      <input 
                        value={time_read}
                        onChange={e=>onChange(e)}
                        name='time_read'
                        type='number'
                        className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese el tiempo de lectura"
                        required
                      />
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateTime(false)}
                        className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </>
                :
                <>
                <div className="w-screen flex justify-between gap-2">
                <p>{post.news.time_read}</p>
              <button
                onClick={() => setUpdateTime(true)}
                type="button"
                className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
              >
                Editar
              </button>
              </div>
              </>
              }
            </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">Categoría</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateCategory ?
                <>
                  <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <span className="flex-grow">
                      {
                        categories &&
                        categories !== null &&
                        categories !== undefined &&
                        categories.map(category=>{
                          if(category.sub_categories.length === 0){
                            return(
                              <div key={category.id} className='flex items-center h-5'>
                              <input
                                onChange={e => onChange(e)}
                                value={category.id.toString()}
                                name='category'
                                type='radio'
                                required
                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                              />
                              <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-light">
                                {category.name}
                              </label>
                              </div>)
                            }else{
                              let result = []
                              result.push(
                                <div key={category.id} className='flex items-center h-5 mt-2'>
                                <input
                                  onChange={e => onChange(e)}
                                  value={category.id.toString()}
                                  name='category'
                                  type='radio'
                                  required
                                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'/>
                                <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-regular">
                                  {category.name}
                                </label>
                                </div>)
                                  category.sub_categories.map(sub_category=>{
                                    result.push(
                                    <div key={sub_category.id} className='flex items-center h-5 ml-2 mt-1'>
                                    <input
                                      onChange={e => onChange(e)}
                                      value={sub_category.id.toString()}
                                      name='category'
                                      type='radio'
                                      className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'/>
                                    <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-light">
                                      {sub_category.name}
                                    </label>
                                    </div> )
                                    })
                                    return result}})
                                    }
                                </span>
                                <span className="flex-shrink-0 flex space-x-2">
                                    <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                    Guardar
                                    </button>
                                    <div
                                    onClick={()=>setUpdateCategory(false)}
                                    className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                    Cancelar
                                    </div>
                                </span>
                            </form>
                            </>
                            :
                            <>
                              <div className="w-screen flex justify-between gap-2">
                              <p>{post.news.category.name}</p>
                              <div
                                onClick={()=>setUpdateCategory(true)}
                                className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800">
                                Editar
                              </div>
                              </div>
                            </>
                        }
                    </dd>
              </div>
              
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Contenido</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {
                updateContent ?
                <>
                  <form onSubmit={e=>onSubmit(e)} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <span className="flex-grow">
                        <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        
                        onChange={(event, editor) =>{
                            const data = editor.getData()
                            setContent(data)
                            }}/>
                    </span>
                    <span className="flex-shrink-0 flex space-x-2">
                        <button
                        type="submit"
                        className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                        Guardar
                        </button>
                        <div
                        onClick={()=>setUpdateContent(false)}
                        className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                        Cancelar
                        </div>
                    </span>
                  </form>
                </>
                :
                <>
                <div className="w-screen flex justify-between gap-2">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.news.content) }} />
                </div>
              <button
                onClick={() => setUpdateContent(true)}
                type="button"
                className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
              >
                Editar
              </button>
                </div>
                
              </>
              }
            </dd>
          </div>
        </dl>
      </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                        <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            {
                                post.title && post.description && post.slug&& post.content ?
                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                :
                                <XMarkIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />

                            }
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {
                                post.get_status === 'published' ?
                                <span>Draftear esta noticia?</span>
                                :
                                <span>Publicar esta noticia?</span>

                            }
                            </Dialog.Title>
                            <div className="mt-2">
                            {
                                post.title && post.description && post.slug && post.content ?
                                <></>
                                :
                                <p className="text-sm text-gray-500">
                                    To publish this post you must add: Title, Description, Slug and Content
                                </p>
                                
                            }
                            </div>
                        </div>
                        </div>
                        {
                            (post.news.title && post.news.description && post.news.slug&& post.news.content) &&
                            <>
                            
                                {
                                    post.news.get_status === 'published' ?
                                    <form onSubmit={e=>onSubmitDraft(e)} className="mt-5 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                
                                            >
                                                    <span>Draftear</span>
                                            </button>
                                            :
                                            <></>
                                    </form>
                                    :
                                    <form onSubmit={e=>onSubmitPublish(e)} className="mt-5 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                
                                            >
                                                    <span>Publicar</span>
                                            </button>
                                            :
                                            <></>
                                    </form>
                                }
                            </>
                        }
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>

            <Transition.Root show={openDelete} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpenDelete}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                        <div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            <span>Delete Post</span>
                            </Dialog.Title>
                            <div className="mt-2">
                            
                                <p className="text-sm text-gray-500">
                                    Are you sure you wish to delete this post?
                                </p>
                            </div>
                        </div>
                        </div>
                        <form onSubmit={e=>onSubmitDelete(e)} className="mt-5 sm:mt-6 flex gap-2">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm">
                                        <span>Delete</span>
                                </button>
                        </form>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
            
          </>
          :
          <>
            <div className="h-screen p-4">Debes iniciar sesión para ver esta página o el post no fue encontrado</div>
          </>
        }
      </div>
    </LayoutDashboard>
  );
}

const mapStateToProps = state => ({
  post: state.news.post,
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.categories.categories
})

export default connect(mapStateToProps, {
  get_auth_news,
  get_categories
}) (EditPost);