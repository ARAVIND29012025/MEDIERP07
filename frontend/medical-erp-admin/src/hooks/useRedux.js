import { useDispatch, useSelector } from 'react-redux'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated, loading, error } = useSelector(state => state.auth)
  
  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    dispatch,
  }
}

export const useMasters = () => {
  const { 
    companies,
    categories,
    manufacturers,
    generics,
    units,
    racks,
    warehouses,
    loading,
    error 
  } = useSelector(state => state.master)
  
  return {
    companies,
    categories,
    manufacturers,
    generics,
    units,
    racks,
    warehouses,
    loading,
    error,
  }
}

export const useMedicine = () => {
  const { medicines, selectedMedicine, loading, error, filters } = useSelector(state => state.medicine)
  
  return {
    medicines,
    selectedMedicine,
    loading,
    error,
    filters,
  }
}

export const useDashboard = () => {
  const { kpis, charts, loading, error } = useSelector(state => state.dashboard)
  
  return {
    kpis,
    charts,
    loading,
    error,
  }
}
