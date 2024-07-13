document.addEventListener('DOMContentLoaded', function () {
  // select the active filter from desktop menu
  let activeLink = document.querySelector('.menu a').parentElement

  // mobile filter selector
  const dropdown = document.querySelector('.dropdown')
  const topHeader = document.querySelector('.top__header')
  // select the active filter from mobile dropdown filter
  const topHeaderLink = document.querySelector('.top__header li')

  // Changing mobile menu filter according to the desktop activefilter
  document.querySelector('.menu').addEventListener('click', function (e) {
    const link = e.target.closest('.link')
    if (!link) return
    document.querySelectorAll('.menu li a').forEach((el) => el.classList.remove('active'))
    link.classList.add('active')
    activeLink = link.parentElement
    const tempEl = activeLink.cloneNode(true)
    const currTopEl = topHeader.firstElementChild

    if (activeLink.dataset.filter !== currTopEl.dataset.filter) {
      topHeader.innerHTML = ''
      topHeader.appendChild(tempEl)
      dropdown.append(currTopEl)
    }

    Array.from(dropdown.children).forEach((el) => {
      if (el.dataset.filter == activeLink.dataset.filter) {
        el.remove()
      }
    })
  })

  // toggle the dropdown
  topHeader.addEventListener('click', function (e) {
    const linkEL = e.target.closest('.link')
    if (!linkEL) return
    toggleDropdown()
  })

  function toggleDropdown() {
    const isClosed = window.getComputedStyle(dropdown).maxHeight == '0px'
    if (isClosed) {
      topHeader.classList.add('active')
      dropdown.style.maxHeight = dropdown.scrollHeight + 'px'
    } else {
      topHeader.classList.remove('active')
      dropdown.style.maxHeight = '0px'
    }
  }

  // mobile menu filter order
  dropdown.addEventListener('click', function (e) {
    const linkEl = e.target.closest('.link')
    if (!linkEl) return
    toggleDropdown()

    const currentLink = e.target.parentElement
    const currentTopHeaderLink = topHeader.firstElementChild
    const filter = currentLink.dataset.filter

    // changing the desktop active filter according to the mobile filter
    document.querySelectorAll('.menu li a').forEach((el) => {
      if (el.parentElement.dataset.filter !== filter) {
        el.classList.remove('active')
      } else {
        el.classList.add('active')
      }
    })

    // Setting the current link and top header link
    if (currentLink !== topHeaderLink) {
      topHeader.innerHTML = ''
      topHeader.appendChild(currentLink)
      dropdown.appendChild(currentTopHeaderLink)
    } else {
      dropdown.appendChild(currentTopHeaderLink)
      topHeader.innerHTML = ''
      topHeader.appendChild(topHeaderLink)
    }
    // AJAX handler
    jQuery.ajax({
      // url: wp_ajax.ajaxurl,
      type: 'POST',
      data: {
        action: 'portfolio_filter',
        filter: filter,
      },
      beforeSend: function () {},
      success: function (response) {
        jQuery('#portfolio-post').html(response)
      },
      error: function () {
        console.log('There was an error processing your request.')
      },
    })
  })
})
