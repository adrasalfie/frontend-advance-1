import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { courseApi, getErrorMessage } from '../services/api/index.js'
import { appendCourse, removeCourse, replaceCourse } from '../utils/courseCrud.js'

/**
 * Custom hook: memisahkan logika API dari komponen.
 *
 * Mengembalikan:
 * - courses, loading, error  : state data & status GET
 * - saving                   : true saat ADD / UPDATE / DELETE sedang berjalan
 * - reload()                 : ambil ulang data (tombol "Coba Lagi")
 * - createCourse(data)       : POST    -> update state lokal bila sukses
 * - editCourse(id, data)     : PUT     -> update state lokal bila sukses
 * - removeCourseById(id)     : DELETE  -> update state lokal bila sukses
 *
 * Fungsi create/edit/remove melempar error (dengan `error.userMessage`) agar komponen bisa menampilkannya.
 */
export default function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  /* GET */
  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await courseApi.getCourses({ signal: controller.signal })
        setCourses(data)
      } catch (err) {
        if (axios.isCancel(err)) return
        setError(getErrorMessage(err))
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [reloadKey])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  /** Bungkus operasi tulis: atur status `saving` dan pastikan selalu dimatikan. */
  const runWrite = async (operation) => {
    setSaving(true)
    try {
      return await operation()
    } finally {
      setSaving(false)
    }
  }

  /* ADD */
  const createCourse = (data) =>
    runWrite(async () => {
      const created = await courseApi.addCourse(data)
      setCourses((prev) => appendCourse(prev, created))
      return created
    })

  /* UPDATE */
  const editCourse = (id, data) =>
    runWrite(async () => {
      const updated = await courseApi.updateCourse(id, data)
      setCourses((prev) => replaceCourse(prev, updated))
      return updated
    })

  /* DELETE */
  const removeCourseById = (id) =>
    runWrite(async () => {
      await courseApi.deleteCourse(id)
      setCourses((prev) => removeCourse(prev, id))
    })

  return { courses, loading, error, saving, reload, createCourse, editCourse, removeCourseById }
}
