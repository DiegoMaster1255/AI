

<html>
<head>
    <title>Moja pierwsza strona w PHP</title>
    <?php
    $db = new mysqli("localhost", "s", "s", "shop");
    session_start();
    if(!isset($_SESSION['products'])){
        $_SESSION['products'] = array();
    }
    ?>
</head>
<body>
<h1>Product list:</h1>
<ul>
    <?php


    $result = $db->query("select * from products");
    $temp = 0;
    ?>
    <?php foreach($result as $v) :?>
        <?php if(isset($_POST['addButton'.$temp])) :
                $flag = array_search($v, $_SESSION['products']); ?>
                <?php if($flag === false) :
                    $_SESSION['products'][] = $v;
                else: ?>
                    <div>Product already in cart!</div>
                <?php endif; ?>
            <?php header("Location: " . $_SERVER['REQUEST_URI']); ?>
        <?php endif; ?>
        <li>
            <form action="" method="POST">
                <div name="name" ><?=$v["Name"] ?></div>
                <div name="price"><?=$v["Price"] ?></div>
                <input type="submit" name="addButton<?=$temp?>" value="Add to cart">
            </form>
        </li>
        <?php $temp = $temp + 1 ?>
    <?php endforeach; ?>

</ul>
<h1>
    CART:
</h1>
<ul>
    <?php
    if(!empty($_SESSION['products']))
        $cart = $_SESSION['products'];
    ?>

    <?php
    if(!empty($cart)){
        foreach($cart as $v) :?>
            <li>
                <div><?=$v["Name"] ?></div>
                <div><?=$v["Price"] ?></div>
            </li>
        <?php endforeach;
    } ?>
</ul>
<form action="" method="POST">
    <input type="submit" name="buyButton" value="Buy">
    <input type="submit" name="clearButton" value="Clear cart">
    <?php
    if(isset($_POST['clearButton'])):
        unset($_SESSION['products']); ?>
        <div>Cart cleared!</div>
        <?php header("Location: " . $_SERVER['REQUEST_URI']); ?>
     <?php endif; ?>
    <?php
    if(isset($_POST['buyButton'])):
        if(!empty($_SESSION['products'])){
            $cart = $_SESSION['products'];
            $result = $db->query("select * from products");
            $flagNew = true;
            foreach($cart as $temp){
                $flag = array_search($temp, $result);
                if($flag === false){
                    $flagNew = false;
                    break;
                }
            }
            if($flagNew == true) :
                $stmt = $db->prepare("DELETE from products where name = ?");
                foreach($cart as $v){
                    $stmt->bind_param("s", $v["Name"]);
                    $res = $stmt->execute();
                }
                unset($_SESSION['products']);?>
                <div>Thank you for you purchase!</div>
            <?php else : ?>
                <div>Product no longer in stock!</div>
            <?php endif ?>

        <?php } ?>

        <?php header("Location: " . $_SERVER['REQUEST_URI']); ?>
    <?php endif; ?>
</form>
</body>
</html>

