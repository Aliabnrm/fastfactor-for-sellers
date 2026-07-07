// import { Spin } from 'antd'
// import useSellerProfile from '@/hooks/useSellerProfile'
// import HeroSection from '@/components/home/heroSection'
// import FeatureSection from '@/components/home/featureSection'

// const HomePage = () => {
//   const { user, sellerProfile, isLoading } = useSellerProfile()

//   const isOnboarded = sellerProfile?.is_onboarded === true
//   const hasProfile = sellerProfile === null && sellerProfile?.is_onboarded === false

//   if (isLoading)
//     return <div className='flex flex-col w-full h-screen justify-center items-center'>
//       <Spin size="large" />
//     </div>

//   if (user && hasProfile) {
//     return <HeroSection />
//   }

//   if (user && isOnboarded) {
//     return <FeatureSection sellerSlug={sellerProfile?.slug} />
//   }

//   return null
// }

// export default HomePage



const HomePage = () => {
  return (
    <div>
      home
    </div>
  )
}

export default HomePage
