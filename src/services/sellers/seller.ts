import { supabase } from '@/lib/supabase'

// GET SellerProfile
export const fetchSellerProfile = async userId => {
  const { data, error } = await supabase
    .from('sellers')
    .select(
      'shop_name, card_owner, shipping_cost, card_number, email, is_onboarded, slug, id',
    )
    .eq('id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return data || null
}

// GET SellerProfile BY Id
export const getSellerBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return data || null
}

// PUT SellerProfile
export const updateSellerProfile = async values => {
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) throw new Error('کاربر لاگین نیست')

  const { error } = await supabase
    .from('sellers')
    .update({
      shop_name: values.shop_name,
      card_owner: values.card_owner,
      shipping_cost: values.shipping_cost,
      card_number: values.card_number,
    })
    .eq('id', userData.user.id)

  if (error) throw error
  return true
}

// Upsert SellerProfile
export const upsertSellerProfile = async (values: any) => {
  const { data: auth } = await supabase.auth.getUser()
  const user = auth.user

  if (!user) {
    throw new Error('کاربر احراز هویت نشده است')
  }

  const sellerData = {
    id: user.id,
    slug: values.slug,
    email: user.email,
    shop_name: values.shopName,
    card_owner: values.ownerName,
    card_number: values.cardNumber,
    shipping_cost: values.shippingCost,
    is_onboarded: true,
  }

  const { data, error } = await supabase
    .from('sellers')
    .upsert(sellerData, {
      onConflict: 'id',
    })
    .select()
    .single()

  if (error) throw error

  return data
}
