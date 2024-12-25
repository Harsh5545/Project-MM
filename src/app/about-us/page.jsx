import AboutHero from '@/components/About-Component/AboutHero'
import Aboutpage from '@/components/About-Component/Aboutpage'
import React from 'react'
import Home from '../page'
import HomeSection from '@/components/Home-Page-Components/HomeSection'
import { AboutManasi } from '@/components/About-Component/AboutManasi'

const page = () => {
  return (
    <div><AboutHero/>
    <Aboutpage/>
    <HomeSection/>
    <AboutManasi/>
    </div>
    )
}

export default page