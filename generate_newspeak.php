<?php
require_once('ACNewspeak.php');
$newspeak = new ACNewspeak();
$r['quote'] = $newspeak->generate_newspeak();
$tweet_content = urlencode( $newspeak->esc_sentence($r['quote']). ' #RobotPsy ');
$r['tweetUrl'] = 'https://twitter.com/intent/tweet?text='.$tweet_content.'&url=https://lab.juliabr.com/psybot';
echo json_encode($r);
?>