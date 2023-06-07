import React from 'react'

const Footer = () => {
  return (
    <>
    <div class="sticky-bottom bg-light text-center text-lg-start">
      <div class="text-center p-3">
        © {new Date().getFullYear()} Acme INC.
      </div>
    </div>
    </>
  )
}

export default Footer