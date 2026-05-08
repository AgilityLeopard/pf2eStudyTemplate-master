import { createClient } from '@supabase/supabase-js'

export default (context, inject) => {
  const supabase = createClient(
    'https://ckgjgnnjbubqbzhridsc.supabase.co',
    'sb_publishable_B-Jg-333gam2jTB0zBOZBg_qrc4BT_t'
  )

  inject('supabase', supabase)
}

