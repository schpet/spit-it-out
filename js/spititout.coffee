$renderedView = $('#rendered-view')
$typingView = $('#typing-view')

$visual = $('#YEAHYEAHYEAH')
$input = $('#input')
$renderButton = $('#render')
$output = $('#output')

$back = $('#back')
$new = $('#new')

fullText = ''
charCount = 0

limit = 19

newlineRegex = /(\r\n|\n|\r)/gm

typingView = () ->

  $typingView.removeClass('hidden')
  $renderedView.addClass('hidden')

  $(document).on('keydown', ()-> 
    $input.focus()
    charCount++

    # value is only changed after the keypress
    # so we wait before collecting it
    setTimeout (()->
      input = $input.val().replace(newlineRegex, "\u23CE ").replace(' ', "\u00a0")

      if charCount > limit
        elText = input.substr(-limit)
        $visual.text(elText)
      else
        $visual.text(input)
    ), 1
  )

  $renderButton.show().on('click touchstart', ()->
    input = $input.val()

    if input.trim() == ''
      $visual.text('Type something first')
      return

    renderView()

    paragraphs = input.split(newlineRegex)
    rendered = for paragraph in paragraphs
      "<p>#{paragraph}</p>"

    $output.html(rendered.join("\n"))
  )

renderView = ()->
  $(document).unbind('keydown')
  $renderedView.removeClass('hidden')
  $typingView.addClass('hidden')

  $back.unbind().on('click', ()->
    typingView()
  )

  $new.unbind().on('click', ()->
    $visual.text('')
    $input.val('')
    typingView()
  )

  $('#about-text').addClass('hidden')
  $('#about').on('click', ()->
    $('#about-text').removeClass('hidden')
  )

typingView()

