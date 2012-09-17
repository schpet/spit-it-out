(function() {
  var $back, $input, $new, $output, $renderButton, $renderedView, $typingView, $visual, charCount, fullText, limit, newlineRegex, renderView, typingView;

  $renderedView = $('#rendered-view');

  $typingView = $('#typing-view');

  $visual = $('#YEAHYEAHYEAH');

  $input = $('#input');

  $renderButton = $('#render');

  $output = $('#output');

  $back = $('#back');

  $new = $('#new');

  fullText = '';

  charCount = 0;

  limit = 19;

  newlineRegex = /(\r\n|\n|\r)/gm;

  typingView = function() {
    $typingView.removeClass('hidden');
    $renderedView.addClass('hidden');
    $(document).on('keydown', function() {
      $input.focus();
      charCount++;
      return setTimeout((function() {
        var elText, input;
        input = $input.val().replace(newlineRegex, "\u23CE ").replace(' ', "\u00a0");
        if (charCount > limit) {
          elText = input.substr(-limit);
          return $visual.text(elText);
        } else {
          return $visual.text(input);
        }
      }), 1);
    });
    return $renderButton.show().on('click touchstart', function() {
      var input, paragraph, paragraphs, rendered;
      input = $input.val();
      if (input.trim() === '') {
        $visual.text('Type something first');
        return;
      }
      renderView();
      paragraphs = input.split(newlineRegex);
      rendered = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = paragraphs.length; _i < _len; _i++) {
          paragraph = paragraphs[_i];
          _results.push("<p>" + paragraph + "</p>");
        }
        return _results;
      })();
      return $output.html(rendered.join("\n"));
    });
  };

  renderView = function() {
    $(document).unbind('keydown');
    $renderedView.removeClass('hidden');
    $typingView.addClass('hidden');
    $back.unbind().on('click', function() {
      return typingView();
    });
    return $new.unbind().on('click', function() {
      $visual.text('');
      $input.val('');
      return typingView();
    });
  };

  $('#about-text').addClass('hidden');

  $('#about').on('click', function() {
    return $('#about-text').toggleClass('hidden');
  });

  typingView();

}).call(this);
