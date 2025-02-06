import Image from "next/image"
import React from 'react'

const Footer = () => {
  return (
    <div className="container bg-[#034C8C] flex py-8">
      <footer className="footer text-white p-4">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <Image
        className="invert brightness-0 mb-2 ml-4"
        src={'https://assets.ligaindonesiabaru.com/uploads/images/logo/lib-2022.png'}
        width={100}
        height={100}
        alt="LeagueLogo"
      />
    </div>
  )
}

export default Footer