from brownie import FakeProductDetection
from scripts.utility import get_account


def deploy_fake_product_detection():
    account = get_account()
    fakeProductDetection = FakeProductDetection.deploy({"from": account})


def main():
    deploy_fake_product_detection()
