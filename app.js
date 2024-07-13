document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.dropdown')
  const topHeader = document.querySelector('.top__header')
  const topHeaderLink = document.querySelector('.top__header li')

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

  dropdown.addEventListener('click', function (e) {
    const linkEl = e.target.closest('.link')
    if (!linkEl) return
    toggleDropdown()

    const currentLink = e.target.parentElement
    const currentTopHeaderLink = topHeader.firstElementChild
    const filter = currentLink.dataset.filter
    console.log(filter)
    // AJAX handler
    // jQuery.ajax({
    //     url: wp_ajax.ajaxurl,
    //   type: 'POST',
    //   data: {
    //     action: 'portfolio_filter',
    //     filter: filter,
    //   },
    //   beforeSend: function () {},
    //   success: function (response) {
    //     jQuery('#portfolio-post').html(response)
    //   },
    //   error: function () {
    //     console.log('There was an error processing your request.')
    //   },
    // })
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
  })
})
